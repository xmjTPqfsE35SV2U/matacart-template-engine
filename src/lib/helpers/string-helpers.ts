import util from './util';
const isObject = (value:any) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};
const isString = (value:any) => {
    return typeof value === 'string';
};

export function registerStringHelpers(Handlebars: typeof import('handlebars')) {
    // sanitize助手函数  --- 严格模式：DOMPurify
    Handlebars.registerHelper("sanitize", function(str) {
        if (typeof str !== 'string') return '';
        // 移除HTML标签，保留文本内容
        return str.replace(/<[^>]*>/g, '').trim();
    });
    // replace 助手函数
    Handlebars.registerHelper("replace",function (str, a, b) {
        if (typeof str !== 'string') return '';
        if (typeof a !== 'string') return str;
        if (typeof b !== 'string') b = '';
        return str.split(a).join(b);
    });
    // uppercase助手函数
    Handlebars.registerHelper("uppercase",function (this:any,str) {
        if (isObject(str) && str.fn) {
            return str.fn(this).toUpperCase();
        }
        if (!isString(str)) return '';
        return str.toUpperCase();
    });
    // trim 助手函数
    Handlebars.registerHelper("trim",function (str) {
        if (typeof str === 'string') {
        return str.trim();
        }
        return str;
    });
    // after 助手函数
    Handlebars.registerHelper("after",function (array, n) {
        if (array == null) return '';
        return array.slice(n);
    });
    // 将字符串中的换行符（\n）替换为HTML换行标签（<br>）。
    // 返回的html标签，需要使用 {{{ }}} 渲染，避免br标签被转义。
    Handlebars.registerHelper("newline_to_br",function (str) {
        if (typeof str !== 'string') {
            return str;
        }
        const result = str.replace(/\n/g, '<br>');
        return new Handlebars.SafeString(result);
    });
    // JSONparse 助手函数
    Handlebars.registerHelper("JSONparse",function (jsonString, options) {
        try {
            // 处理不同类型的输入
            if (typeof jsonString === 'object') {
            // 如果已经是对象，直接返回
            return jsonString;
            }
        
            if (typeof jsonString !== 'string') {
            // 如果不是字符串也不是对象，根据选项决定返回值
            if (options && options.hash && options.hash.default) {
                return JSON.parse(options.hash.default);
            }
            return null;
            }
        
            // 处理空字符串
            if (jsonString.trim() === '') {
            if (options && options.hash && options.hash.default) {
                return JSON.parse(options.hash.default);
            }
            return null;
            }
        
            // 解析 JSON 字符串
            const parsed = JSON.parse(jsonString);
            return parsed;
        } catch (error) {
            // 如果提供了默认值，尝试解析并返回默认值
            if (options && options.hash && options.hash.default) {
            try {
                return JSON.parse(options.hash.default);
            } catch (defaultError) {
                console.error('JSONparse default value error:', defaultError);
            }
            }
            // 根据选项决定返回值
            if (options && options.hash && options.hash.returnEmptyObject) {
            return {};
            }
            // 默认返回 null
            return null;
        }
    });
    // stringify 助手函数
    Handlebars.registerHelper("stringify",function (obj) {
        return JSON.stringify(obj);
    });
    // split 助手函数
    Handlebars.registerHelper("split", function (str, ch) {
        if (!util.isString(str)) return '';
        if (!util.isString(ch)) ch = ',';
        return str.split(ch);
    });
    // join 助手函数
    Handlebars.registerHelper("join", function (array, separator) {
        if (typeof array === 'string') return array;
        if (!Array.isArray(array)) return '';
        separator = util.isString(separator) ? separator : ', ';
        return array.join(separator);
    });
    // JSONstringify
    Handlebars.registerHelper('JSONstringify', function(context) {
        // 将对象序列化为 JSON 字符串
        const jsonString = JSON.stringify(context);
        // 返回 SafeString 以防止 HTML 转义
        return new Handlebars.SafeString(jsonString);
    });
    // startsWith 助手函数 - 检查字符串是否以指定的子字符串开头
    Handlebars.registerHelper("startsWith", function(this:any,string, prefix, options) {
      try {
        // 检查输入参数
        if (string === null || string === undefined || prefix === null || prefix === undefined) {
          // 如果是块级调用，返回inverse块
          if (options && typeof options.fn === 'function' && options.inverse) {
            return options.inverse(this);
          }
          return false;
        }
        
        // 确保参数是字符串
        const str = String(string);
        const substr = String(prefix);
        
        // 检查字符串是否以指定前缀开头
        const result = str.startsWith(substr);
        
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
          return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        
        // 子表达式调用直接返回布尔值
        return result;
      } catch (error) {
        console.error('startsWith helper error:', error);
        // 出错时返回false或inverse块
        if (options && typeof options.fn === 'function' && options.inverse) {
          return options.inverse(this);
        }
        return false;
      }
    });
    // numToString 助手函数
    Handlebars.registerHelper('numToString', function(number) {
      try {
        // 处理不同的输入类型
        if (number === null || number === undefined) {
          return '';
        }
        
        // 如果已经是字符串，直接返回
        if (typeof number === 'string') {
          return number;
        }
        
        // 如果是数字，转换为字符串
        if (typeof number === 'number') {
          return number.toString();
        }
        
        // 如果是 bigint 类型
        if (typeof number === 'bigint') {
          return number.toString();
        }
        
        // 如果是布尔值
        if (typeof number === 'boolean') {
          return number.toString();
        }
        
        // 如果是对象，尝试转换
        if (typeof number === 'object') {
          // 处理 Number 对象
          if (number instanceof Number) {
            return number.toString();
          }
          
          // 处理其他对象，先尝试valueOf
          if (typeof number.valueOf === 'function') {
            const value = number.valueOf();
            if (typeof value === 'number' || typeof value === 'bigint') {
              return value.toString();
            }
          }
          
          // 最后尝试JSON序列化
          return JSON.stringify(number);
        }
        
        // 其他类型直接转换为字符串
        return String(number);
      } catch (error) {
        console.error('numToString helper error:', error);
        return '';
      }
    });
}