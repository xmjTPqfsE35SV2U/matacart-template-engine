import { getFileContent } from "../fileManager/fileContent";

// 本地工具函数
const util = {
    // 检查是否为字符串
    isString: function(val:any) {
        return typeof val === 'string';
    },
    // 检查是否为对象
    isObject: function(val:any) {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
    },
    // 检查是否为选项对象
    isOptions: function(val:any) {
        return val && typeof val === 'object' && val.hash !== undefined;
    },
    // 检查是否未定义
    isUndefined: function(val:any) {
        return val === undefined;
    },
    // 获取结果值，如果是函数则执行
    result: function(val:any) {
        if (typeof val === 'function') {
        return val();
        }
        return val;
    },
    // 检查数组中是否包含元素
    indexOf: function(arr:any, item:any) {
        if (!Array.isArray(arr)) return -1;
        return arr.indexOf(item);
    },
    // 执行函数并返回结果
    fn: function(result:any, context:any, options:any) {
        if (options && typeof options.fn === 'function') {
        return options.fn(context);
        }
        return result;
    },
    // 执行inverse函数
    inverse: function(result:any, context:any, options:any) {
        if (options && typeof options.inverse === 'function') {
        return options.inverse(context);
        }
        return result;
    },
    // 返回值，根据是否为块调用
    value: function(result:any, context:any, options:any) {
        if (options && typeof options.fn === 'function') {
        return result ? options.fn(context) : (options.inverse ? options.inverse(context) : '');
        }
        return result;
    },
    // 检查是否为数字
    isNumber:function(value: any){
        return typeof value === 'number' && !isNaN(value);
    },
    /**
     * 渲染指定模板文件
     * @param {string} templateName - 模板名称（相对路径）
     * @param {Object} context - 上下文数据
     * @param {Object} fileConfig - 文件配置对象
     * @returns {string} 渲染后的内容
     */
    renderTemplate:function(handlebars:any,templateName:string, context:any, fileConfig:any){
      try {
        // 构造模板文件路径
        const templatePath = `${templateName}.html`;
        // 获取模板文件内容
        const templateContent = getFileContent(templatePath, fileConfig);
        if (!templateContent) {
          console.warn(`Template not found: ${templatePath}`);
          return '';
        }
        // 编译模板
        const template = handlebars.compile(templateContent);
        // 渲染模板并返回结果
        return template(context);
      } catch (error) {
        console.error(`Error rendering template ${templateName}:`, error);
        return '';
      }
    },
    // 辅助函数：计算要显示的页码范围
    getPageRange:function(current:number, lastPage:number) {
        const range = [];
        if (lastPage <= 7) {
            // 如果总页数小于等于7，显示所有页码
            for (let i = 1; i <= lastPage; i++) {
                range.push(i);
            }
        } else {
            // 如果总页数大于7，显示部分页码和省略号
            if (current <= 4) {
                // 当前页在前4页内
                for (let i = 1; i <= 5; i++) {
                    range.push(i);
                }
                range.push('...');
                range.push(lastPage);
            } else if (current >= lastPage - 3) {
                // 当前页在后4页内
                range.push(1);
                range.push('...');
                for (let i = lastPage - 4; i <= lastPage; i++) {
                    range.push(i);
                }
            } else {
                // 当前页在中间
                range.push(1);
                range.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    range.push(i);
                }
                range.push('...');
                range.push(lastPage);
            }
        }
        return range;
    }

};


export default util;