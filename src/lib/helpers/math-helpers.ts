import util from './util';

export function registerMathHelpers(Handlebars: typeof import('handlebars')) {
    // ternary 助手函数
    Handlebars.registerHelper("ternary",function (condition, valueIfTrue, valueIfFalse) {
        // 获取 options 对象（Handlebars 传递的最后一个参数）
        const options = arguments[arguments.length - 1];
        // 如果 valueIfFalse 是 options 对象，则说明只传入了两个值参数
        if (typeof valueIfFalse === 'object' && valueIfFalse.hasOwnProperty('hash')) {
        valueIfFalse = undefined;
        }
        // 返回基于条件的值
        return condition ? valueIfTrue : valueIfFalse;
    });
    // 在 Handlebars 中注册 minus 助手函数
    Handlebars.registerHelper("minus",function (value1, value2) {
        // 将参数转换为数字并执行减法运算
        const num1 = Number(value1);
        const num2 = Number(value2);
        // 返回第一个数减去第二个数的结果
        return num1 - num2;
    });
    // add助手函数
    Handlebars.registerHelper("add",function (...args) {
        const values = args.slice(0, -1);
        // 计算所有参数的和
        return values.reduce((sum, value) => {
            return sum + Number(value || 0);
        }, 0);
    });
    // divide助手函数
    Handlebars.registerHelper("divide",function (numA, numB) {
        return Math.floor(numA / numB);
    });
    // subtract 助手函数
    Handlebars.registerHelper("subtract",function(a, b) {
        if (!util.isNumber(a)) {
            throw new TypeError('expected the first argument to be a number');
        }
        if (!util.isNumber(b)) {
            throw new TypeError('expected the second argument to be a number');
        }
        return Number(a) - Number(b);
    });
    // 生成随机整数（包含 min 和 max）
    Handlebars.registerHelper("random", function (min, max) {
        if (!util.isNumber(min)) {
            throw new TypeError('expected minimum to be a number');
        }
        if (!util.isNumber(max)) {
            throw new TypeError('expected maximum to be a number');
        }
        // 确保 min 小于 max
        if (min > max) {
            [min, max] = [max, min]; // 交换值
        }
        // 生成随机整数（包含 min 和 max）
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    // multiply助手函数
    Handlebars.registerHelper('multiply', function(a, b) {
        return parseFloat(a) * parseFloat(b);
    });
    // plus 助手函数
    Handlebars.registerHelper("plus", function (a, b) {
        // 将参数转换为数字，如果转换失败则默认为0
        const numA = Number(a) || 0;
        const numB = Number(b) || 0;
        // 检查转换后的值是否为有效数字
        if (isNaN(numA) || isNaN(numB)) {
            // 如果任一参数无法转换为有效数字，则返回0
            return 0;
        }
        return numA + numB;
    });
    // replace_by_regex 助手函数
    Handlebars.registerHelper('replace_by_regex', function(str, pattern, flags, replacement) {
        try {
            const regex = new RegExp(pattern, flags);
            return str.replace(regex, replacement);
        } catch (e) {
            return str;
        }
    });
}