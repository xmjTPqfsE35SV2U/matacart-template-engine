// packages/my-hbs/index.d.ts
declare module 'matacart-template-engine' {
  
  interface HbsOptions {
    viewsDir?: string;
    partialsDir?: string;
    helpers?: { [key: string]: Function };
  }

  // 定义编译后的模板函数类型
  type CompiledTemplate = (context: object) => string;

  export class HbsTemplateEngine {
    constructor(options?: HbsOptions);
    render(templateName: string, context?: object): Promise<string>;
    renderString(templateString: string, context?: object): Promise<string>;
    renderFile(filePath: string, context?: object): Promise<string>;
    createSafeString(str: string): any;
    compile(templateString: string): CompiledTemplate;
    i18nManager: any;
  }

  export function render(templateName: string, context?: object): Promise<string>;
  export function renderString(templateString: string, context?: object): Promise<string>;
  export function renderFile(filePath: string, context?: object): Promise<string>;
  // 为了兼容之前的API
  export function renderTemplate(filePath: string, context?: object): Promise<string>;
  
  const matacartTemplateEngine: {
    myHbs:{
      HbsTemplateEngine: typeof HbsTemplateEngine,
      render: typeof render,
      renderString: typeof renderString,
      renderFile: typeof renderFile,
      createSafeString: (str: string) => string,
      compile: (templateString: string) => CompiledTemplate,
      i18nManager: any,
    }
  };
  
  export default matacartTemplateEngine;
}