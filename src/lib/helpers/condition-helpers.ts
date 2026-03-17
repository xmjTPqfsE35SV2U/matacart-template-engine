// 导入工具函数
import util from './util';
// 自定义isFalsy函数
function isFalsy(value: any): boolean {
    return !value || value === 0 || value === '' || Number.isNaN(value);
}

export function registerConditionHelpers(Handlebars: typeof import('handlebars')) {
    // cond助手函数
    Handlebars.registerHelper("cond",function (condition, value1, value2, options) {
        // 支持更复杂的条件判断
        let isTruthy;
        // 如果有哈希参数，可以支持自定义判断逻辑
        if (options.hash) {
            if (options.hash.notEmpty) {
            // 判断是否为非空
            isTruthy = condition !== null &&
                condition !== undefined &&
                condition !== '' &&
                !(Array.isArray(condition) && condition.length === 0);
            } else if (options.hash.exists) {
            // 判断是否存在（不为undefined）
            isTruthy = condition !== undefined;
            }
        }
        // 默认的真假值判断
        if (isTruthy === undefined) {
            isTruthy = !!condition;
        }
        // 返回相应值
        return isTruthy ? value1 : value2;
    });
    // boolean助手函数
    Handlebars.registerHelper("boolean", function (this:any,...args) {
        // 获取 options 对象（最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的参数（除了 options）
        const values = args.slice(0, -1);
        // 如果只有一个值参数，直接返回其布尔值
        if (values.length === 1) {
            if (options && typeof options.fn === 'function') {
            return values[0] ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            return !!values[0];
        }
        // 如果有两个值参数，进行简单比较
        if (values.length === 2) {
            if (options && typeof options.fn === 'function') {
            return values[0] == values[1] ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            return values[0] == values[1];
        }
        // 处理复杂表达式（三个或更多参数）
        if (values.length >= 3) {
            let result = values[0];
            // 按顺序处理操作符和操作数
            for (let i = 1; i < values.length; i += 2) {
            const operator = values[i];
            const operand = values[i + 1];
            // 如果缺少操作数，跳出循环
            if (operand === undefined) break;
            // 定义操作符映射
            const operatorMap:any = {
                '==': (a:any, b:any) => a == b,
                '===': (a:any, b:any) => a === b,
                '!=': (a:any, b:any) => a != b,
                '!==': (a:any, b:any) => a !== b,
                '>': (a:any, b:any) => a > b,
                '>=': (a:any, b:any) => a >= b,
                '<': (a:any, b:any) => a < b,
                '<=': (a:any, b:any) => a <= b,
                '&&': (a:any, b:any) => a && b,
                '||': (a:any, b:any) => a || b
            };
            // 检查操作符是否有效
            if (!(operator in operatorMap)) {
                console.error('boolean helper error: Invalid operator', operator);
                result = false;
                break;
            }
            // 执行操作
            result = operatorMap[operator](result, operand);
            }
            // 块级调用处理
            if (options && typeof options.fn === 'function') {
            return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
            }
            // 返回最终结果
            return result;
        }
        // 默认情况
        if (options && typeof options.fn === 'function') {
            return options.inverse ? options.inverse(this) : '';
        }
        return false;
    });
    // isFalsey助手函数 -- 兼容后代模板
    Handlebars.registerHelper("isFalsey",function (this:any,...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const value = args.length > 1 ? args[0] : undefined;
        // 使用 falsey 库判断值是否为 falsy，然后取反得到 truthy
        const isTruthy = isFalsy(value);
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return isTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return isTruthy;
    });
    // and助手函数
    Handlebars.registerHelper("and",function (this:any) {
        // 获取参数
        const args = Array.from(arguments);
        // 最后一个参数是 Handlebars 的 options 对象
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const values = args.slice(0, -1);
        // 检查是否所有值都为真
        const allTruthy = values.every(value => {
            // 过滤掉空字符串、null、undefined、false、0、NaN
            return value !== false && value !== null && value !== undefined && value !== 0 && value !== '' && !Number.isNaN(value);
        });
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return allTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return allTruthy;
    });
    // or 助手函数
    Handlebars.registerHelper("or",function (this:any) {
        // 获取参数
        const args = Array.from(arguments);
        // 最后一个参数是 Handlebars 的 options 对象
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const values = args.slice(0, -1);
        // 检查是否有任何一个值为真
        const hasTruthyValue = values.some(value => {
            // 过滤掉空字符串、null、undefined、false、0、NaN
            return value !== false && value !== null && value !== undefined && value !== 0 && value !== '' && !Number.isNaN(value);
        });
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return hasTruthyValue ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return hasTruthyValue;
    });
    // has 助手函数
    Handlebars.registerHelper("has",function (this:any,value, pattern, options) {
        // 处理参数
        if (arguments.length === 2 && typeof pattern === 'object' && pattern && typeof pattern.fn === 'function') {
            // 只有两个参数，且第二个参数是options对象
            options = pattern;
            pattern = null;
            // value保持不变
        }
        if (arguments.length === 1 && typeof value === 'object' && value && typeof value.fn === 'function') {
            // 只有一个参数，且它是options对象
            options = value;
            pattern = null;
            value = null;
        }
        if (value === null || value === undefined) {
            // 如果是块级调用，返回false并执行inverse部分
            if (options && typeof options.inverse === 'function') {
            return options.inverse(this);
            }
            return false;
        }
        // 检查value是否为对象且包含pattern属性
        if (arguments.length === 2) {
            // 当只有两个参数时，检查当前上下文(this)中是否包含value属性
            if (this && typeof this === 'object' && value in this) {
            if (options && typeof options.fn === 'function') {
                return options.fn(this);
            }
            return true;
            } else {
            if (options && typeof options.inverse === 'function') {
                return options.inverse(this);
            }
            return false;
            }
        }
        // 检查value是否为数组或字符串且包含pattern子串
        if ((Array.isArray(value) || typeof value === 'string') && typeof pattern === 'string') {
            if (value.indexOf(pattern) > -1) {
            if (options && typeof options.fn === 'function') {
                return options.fn(this);
            }
            return true;
            }
        }
        // 检查value是否为对象且包含pattern属性
        if (value && typeof value === 'object' && typeof pattern === 'string' && pattern in value) {
            if (options && typeof options.fn === 'function') {
            return options.fn(this);
            }
            return true;
        }
        // 如果都不匹配，返回inverse部分（如果存在）或false
        if (options && typeof options.inverse === 'function') {
            return options.inverse(this);
        }
        return false;
    });
    // isTruthy助手函数
    Handlebars.registerHelper("isTruthy",function (this:any,...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 获取实际的值参数（除了 options）
        const value = args.length > 1 ? args[0] : undefined;
        // 使用 falsey 库判断值是否为 falsy，然后取反得到 truthy
        const isTruthy = !isFalsy(value);
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return isTruthy ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        // 子表达式调用直接返回布尔值
        return isTruthy;
    });
    // gt 助手函数
    Handlebars.registerHelper("gt",function (value1, value2) {
        // 检查参数是否为数字
        const num1 = Number(value1);
        const num2 = Number(value2);
        // 确保转换后的值不是 NaN
        if (isNaN(num1) || isNaN(num2)) {
            return false;
        }
        // 返回第一个值是否大于第二个值
        return num1 > num2;
    });
    // not 助手函数
    Handlebars.registerHelper("not",function (this:any,val, options) {
      return util.value(!val, this, options);
    });
    // contains​
    // 判断字符串包含子串或数组包含子元素.
    // variable | contains(value) returns [boolean]
    // 参数​
    // variable string,array: 检查的变量。
    // value string,boolean,number: 检查的值。
    Handlebars.registerHelper("contains", function(this:any,variable, value, options) {
        // 获取 options 对象（通常是最后一个参数）
        const args = Array.from(arguments);
        const opts = typeof args[args.length - 1] === 'object' && args[args.length - 1].hash ? args[args.length - 1] : {};
        
        // 确定 variable 和 value 参数
        let varToCheck, searchValue;
        if (opts === opts) {
            varToCheck = args[0];
            searchValue = args[1];
        }
        
        // 如果 variable 是 undefined 或 null，返回 false
        if (varToCheck === undefined || varToCheck === null) {
            // 根据是否为块级调用来决定返回值
            if (options && typeof options.fn === 'function') {
            return options.inverse ? options.inverse(this) : '';
            }
            return false;
        }
        
        let result = false;
        
        // 检查数组是否包含值
        if (Array.isArray(varToCheck)) {
            result = varToCheck.includes(searchValue);
        }
        // 检查字符串是否包含子字符串
        else if (typeof varToCheck === 'string' && typeof searchValue === 'string') {
            result = varToCheck.includes(searchValue);
        }
        // 检查对象是否包含属性
        else if (typeof varToCheck === 'object' && searchValue in varToCheck) {
            result = true;
        }
        
        // 如果是块级调用
        if (options && typeof options.fn === 'function') {
            return result ? options.fn(this) : (options.inverse ? options.inverse(this) : '');
        }
        
        // 子表达式调用直接返回布尔值
        return result;
    });
    // lt 助手函数
    Handlebars.registerHelper("lt",function (this:any,a, b, options) {
        try {
            // 处理参数数量变化的情况
            if (arguments.length === 2) {
            options = b;
            b = options.hash && options.hash.compare ? options.hash.compare : 0;
            }
            
            // 确保比较的值是有效数字
            const numA = Number(a);
            const numB = Number(b);
            
            // 检查是否为有效数字
            if (isNaN(numA) || isNaN(numB)) {
            return util.value(false, this, options);
            }
            
            // 执行小于比较
            return util.value(numA < numB, this, options);
        } catch (error) {
            console.error('lt helper error:', error);
            console.warn('a:', a);
            console.warn('b:', b);
        
            return util.value(false, this, options);
        }
    });
    // is 助手函数
    Handlebars.registerHelper("is", function (this:any,a, b, options) {
      if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
      }
      return util.value(a == b, this, options);
    });
    // compare 助手函数 比较运算
    Handlebars.registerHelper('compare', function (value1, operator, value2) {
        switch (operator) {
        case '==': return value1 == value2;
        case '===': return value1 === value2;
        case '!=': return value1 != value2;
        case '!==': return value1 !== value2;
        case '<': return value1 < value2;
        case '<=': return value1 <= value2;
        case '>': return value1 > value2;
        case '>=': return value1 >= value2;
        case '&&': return value1 && value2;
        case '||': return value1 || value2;
        case 'contains': 
            return (typeof value1 === 'string' && value1.includes(value2)) || 
                    (Array.isArray(value1) && value1.includes(value2));
        default: 
            throw new Error(`Unsupported operator: ${operator}`);
        }
    });
    // eq 助手函数
    Handlebars.registerHelper('eq', function(this:any,a, b, options) {
      if (arguments.length === 2) {
        options = b;
        b = options.hash.compare;
      }
      return util.value(a === b, this, options);
    });
}