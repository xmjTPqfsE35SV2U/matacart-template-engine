import * as fs from 'fs';
import * as path from 'path';
// 引入全局Handlebars 对象
import { Handlebars } from './helper'; // 注意扩展名

type HelperDelegate = (context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, options?: HelperOptions) => any;

interface HbsTemplateEngineOptions {
  viewsDir?: string;
  partialsDir?: string;
  helpers?: Record<string, HelperDelegate>;
  fileContentProvider?: (fileName: string, config?: any) => string | Promise<string>;
}

interface HelperOptions {
  fn: Function;
  inverse: Function;
}


class HbsTemplateEngine {
  private handlebars: typeof Handlebars;
  private viewsDir: string;
  private partialsDir: string;
  private helpers: Record<string, HelperDelegate>;

  constructor(options: HbsTemplateEngineOptions = {}) {
    this.handlebars = Handlebars;
    this.viewsDir = options.viewsDir || path.join(process.cwd(), 'views');
    this.partialsDir = options.partialsDir || path.join(this.viewsDir, 'partials');
    this.helpers = options.helpers || {} as Record<string, HelperDelegate>;

    // 注册自定义助手
    this.registerHelpers();
  }
  
  registerHelpers() {
    // 注册自定义助手
    Object.keys(this.helpers).forEach(name => {
      this.handlebars.registerHelper(name, this.helpers[name]);
    });
  }
  
  async registerPartials() {
    try {
      const partials = await fs.promises.readdir(this.partialsDir);
      for (const partial of partials) {
        if (path.extname(partial) === '.hbs') {
          const partialName = path.basename(partial, '.hbs');
          const partialPath = path.join(this.partialsDir, partial);
          const partialContent = await fs.promises.readFile(partialPath, 'utf-8');
          this.handlebars.registerPartial(partialName, partialContent);
        }
      }
    } catch (err: any) {
      // 如果partials目录不存在，忽略错误
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }
  
  async render(templateName: string, context: any = {}) {
    const templatePath = path.join(this.viewsDir, `${templateName}.hbs`);
    const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
    const template = this.handlebars.compile(templateContent);
    return template(context);
  }
  
  async renderString(templateString: string, context: any = {}) {
    const template = this.handlebars.compile(templateString);
    return template(context);
  }
  
  async renderFile(filePath: string, context: any = {}) {
    const templateContent = await fs.promises.readFile(filePath, 'utf-8');
    const template = this.handlebars.compile(templateContent);
    return template(context);
  }

  // 添加创建安全字符串的方法
  createSafeString(string: string) {
    return new this.handlebars.SafeString(string);
  }

  // 添加编译方法，返回编译后的模板函数
  compile(templateString: string) {
    return this.handlebars.compile(templateString);
  }
}

module.exports = { HbsTemplateEngine };