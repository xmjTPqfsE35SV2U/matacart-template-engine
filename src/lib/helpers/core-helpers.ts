

// 导入工具函数
import util from './util';
// 导入dayjs库
import dayjs from 'dayjs';

export function registerCoreHelpers(Handlebars: typeof import('handlebars')) {

    // content_for_footer 助手函数
    Handlebars.registerHelper("content_for_footer",function () {
    });
    // get助手函数
    Handlebars.registerHelper("get",function (propertyPath, object, options) {
        try {
            // 处理参数
            if (propertyPath === null || propertyPath === undefined ||
            object === null || object === undefined) {
            return undefined;
            }
            // 如果 propertyPath 是一个字符串且包含点号，需要递归查找
            if (typeof propertyPath === 'string' && propertyPath.includes('.')) {
            const keys = propertyPath.split('.');
            let result = object;
            // 逐级访问嵌套属性
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i].trim();
                if (result && typeof result === 'object' && key in result) {
                result = result[key];
                } else {
                return undefined;
                }
            }
            return result;
            }
            // 直接属性访问
            if (typeof object === 'object' && propertyPath in object) {
            return object[propertyPath];
            }
            return undefined;
        } catch (error) {
            console.error('get helper error:', error);
            return undefined;
        }
    });
    // lte助手函数
    Handlebars.registerHelper("lte",function (value1, value2) {
        // 直接返回第二个值，实现"将第二个值赋值给第一个值"的功能
        return value2;
    });
    // 自定义if助手函数
    Handlebars.registerHelper("if", function (this:any,...args) {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];
        // 判断是否为块级调用
        const isBlockCall = typeof options === 'object' && options.fn;
        // 操作符
        const operatorMap:Record<string, (v1: any, v2: any) => boolean> = {
            '==': function (v1:any, v2:any) { return v1 == v2; },
            '===': function (v1:any, v2:any) { return v1 === v2; },
            '!=': function (v1:any, v2:any) { return v1 != v2; },
            '!==': function (v1:any, v2:any) { return v1 !== v2; },
            '>': function (v1:any, v2:any) { return v1 > v2; },
            '<': function (v1:any, v2:any) { return v1 < v2; },
            '>=': function (v1:any, v2:any) { return v1 >= v2; },
            '<=': function (v1:any, v2:any) { return v1 <= v2; },
            'and': function (v1:any, v2:any) { return v1 && v2; },
            'or': function (v1:any, v2:any) { return v1 || v2; },
            'contains': function (v1:any, v2:any) {
            // 检查 v1 是否为数组且包含 v2
            if (Array.isArray(v1)) {
                return v1.includes(v2);
            }
            // 如果 v1 是字符串，检查是否包含子字符串
            if (typeof v1 === 'string' && typeof v2 === 'string') {
                return v1.includes(v2);
            }
            return false;
            },
        };
        if (isBlockCall) {
            if (args.length == 4) {
                return operatorMap[args[1]](args[0], args[2]) ? options.fn(this) : options.inverse(this);
            } else {
                return args[0] ? options.fn(this) : options.inverse(this);
            }
            } else {
            if (args.length == 4) {
                return operatorMap[args[1]](args[0], args[2]);
            } else {
                return args[0];
            }
        }
    });
    Handlebars.registerHelper("forEach", function(this:any,array, options) {
        if (!array || !Array.isArray(array) || array.length === 0) {
            return '';
        }
        let result = '';
        for (let i = 0; i < array.length; i++) {
            // 创建当前项的上下文
            const itemContext = Object.create(this);
            // 添加数组遍历相关的属性
            Object.assign(itemContext, array[i]); // 合并当前项的属性
            itemContext['@index'] = i;
            itemContext['@first'] = (i === 0);
            itemContext['@last'] = (i === array.length - 1);
            itemContext['@odd'] = (i % 2 === 1);
            itemContext['@even'] = (i % 2 === 0);
            itemContext['isLast'] = (i === array.length - 1); // 用于您的代码中的判断
            // 执行模板并累加结果
            result += options.fn(itemContext);
        }
        return result;
    });
    // assign助手函数
    Handlebars.registerHelper('assign',function (this:any,key, value, options) {
        // 在当前上下文中创建变量
        if(value){
            this[key] = value;
        }
        return '';
    });
    // default助手函数
    Handlebars.registerHelper("default",function (value, defaultValue, options) {
        try {
            // 处理参数
            // 如果第三个参数是 options（Handlebars 的 options 对象）
            if (!options && typeof defaultValue === 'object' && defaultValue !== null && defaultValue.hash) {
                options = defaultValue;
                defaultValue = undefined;
            }
            // 获取配置选项
            const config = {
                allowEmptyStr: options && options.hash && options.hash.allow_empty_str ? options.hash.allow_empty_str : false,
                allowFalse: options && options.hash && options.hash.allow_false ? options.hash.allow_false : false
            };
            // 检查值是否为空
            let isEmpty = false;
            // 检查 null 或 undefined
            if (value === null || value === undefined) {
            isEmpty = true;
            }
            // 检查空字符串（除非 allowEmptyStr 为 true）
            else if (value === '' && !config.allowEmptyStr) {
            isEmpty = true;
            }
            // 检查 false（除非 allowFalse 为 true）
            // else if (value === false && !config.allowFalse) {
            //   isEmpty = true;
            // }
            // 如果值为空，返回默认值；否则返回原值
            return isEmpty ? (defaultValue !== undefined ? defaultValue : '') : value;
        } catch (error) {
            console.error('default helper error:', error);
            // 出错时返回空字符串
            return '';
        }
    });
    // preload_state助手函数 -- 预加载 数据，将数据存储在 window 对象中
    Handlebars.registerHelper("preload_state", function (this:any,...args) {
        try {
            // 获取 options 对象（通常是最后一个参数）
            const options = args[args.length - 1];
            // 获取实际的参数（除了 options）
            const stateKeys = args.slice(0, -1);
            // 生成预加载脚本 (无论是否为块级调用都要生成脚本)
            let scriptContent = '<script>';
            scriptContent += 'window.__PRELOAD_STATE__ = window.__PRELOAD_STATE__ || {};';
            // 创建状态对象树
            const stateTree:any = {};
            stateKeys.forEach(key => {
            if (typeof key !== 'string') return;
            // 获取数据值
            let value = undefined;
            if (key.includes('.')) {
                const keys = key.split('.');
                let result = this;
                let found = true;
                for (let i = 0; i < keys.length; i++) {
                const k = keys[i].trim();
                if (result && typeof result === 'object' && k in result) {
                    result = result[k];
                } else {
                    found = false;
                    break;
                }
                }
                if (found) value = result;
            } else if (key in this) {
                value = this[key];
            }
            
            // 3. 将值添加到状态树
            if (value !== undefined) {
                const keys = key.split('.');
                let current: Record<string, any> = stateTree; // 明确类型定义;
                for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];
                if (!current[k]) current[k] = {};
                    current = current[k];
                }
                current[keys[keys.length - 1]] = value;
            }
            });
            // 生成对象赋值语句（关键修改点）
            Object.keys(stateTree).forEach(topLevelKey => {
                try {
                    const value = stateTree[topLevelKey];
                    scriptContent += `window.__PRELOAD_STATE__.${topLevelKey} = ${JSON.stringify(value)};`;
                } catch (e) {
                    scriptContent += `window.__PRELOAD_STATE__.${topLevelKey} = null;`;
                }
            });
            scriptContent += '</script>';
            // 如果是块级调用
            if (options && typeof options.fn === 'function') {
            // 执行块内容
            const blockContent = options.fn(this);
            return new Handlebars.SafeString(scriptContent + blockContent);
            } else {
            // 子表达式调用或简单调用 (也要返回脚本内容)
            return new Handlebars.SafeString(scriptContent);
            }
        } catch (error) {
            console.error('preload_state helper error:', error);
            return '';
        }
    });
    // json 助手函数
    Handlebars.registerHelper("json",function (object) {
    try {
        // 如果没有提供参数，返回空字符串
        if (object === undefined || object === null) {
        return '';
        }
        // 如果已经是字符串，尝试解析然后重新序列化，确保是有效的JSON
        if (typeof object === 'string') {
        try {
            // 尝试解析字符串为对象，然后再序列化
            const parsed = JSON.parse(object);
            return JSON.stringify(parsed);
        } catch (parseError) {
            // 如果解析失败，直接序列化原字符串
            return JSON.stringify(object);
        }
        }
        // 对于对象、数组、数字、布尔值等，直接序列化
        return JSON.stringify(object);
    } catch (error) {
        console.error('json helper error:', error);
        // 出错时返回空字符串
        return '';
    }
    });
    // form 助手函数
    Handlebars.registerHelper("form", function (this:any,...args) {
        // 获取参数
        const options = args[args.length - 1]; // 最后一个是 Handlebars 的 options 对象
        const formType = args[0]; // 表单类型，如 "localization", "customer" 等
        const attrs = args.slice(1, -1); // 中间的参数作为额外属性
        
        // 初始化表单属性
        let formAttributes:any = {
            method: 'post',
            action: '',
            id: '',
            class: '',
            enctype: 'application/x-www-form-urlencoded',
            'accept-charset': 'UTF-8'
        };

        // 处理 hash 参数
        if (options.hash) {
            Object.keys(options.hash).forEach(key => {
            formAttributes[key] = options.hash[key];
            });
        }

        // 根据表单类型设置 action
        switch (formType) {
            case 'localization':
                formAttributes.action = '/api/localization';
                formAttributes.enctype = 'application/x-www-form-urlencoded';
                break;
            case 'customer':
                formAttributes.action = '/account';
                break;
            case 'contact':
                formAttributes.action = '/contact';
                break;
            case 'cart':
                formAttributes.action = '/cart';
                break;
            case 'product':
                formAttributes.action = '/cart/add';
                break;
            case 'storefront_password':
                formAttributes.action = '/api/site/form/storefront_password';
                break;
            default:
                formAttributes.action = '/' + formType;
        }

        // 构建属性字符串
        let attrString = '';
        Object.keys(formAttributes).forEach(key => {
            if (formAttributes[key]) {
            attrString += ` ${key}="${formAttributes[key]}"`;
            }
        });

        // 处理额外的属性参数
        attrs.forEach(attr => {
            if (typeof attr === 'string' && attr.includes('=')) {
            const [key, value] = attr.split('=');
            attrString += ` ${key}="${value}"`;
            }
        });

        // 构建表单开始标签
        let formStart = `<form${attrString}>`;
        
        // 添加隐藏的表单字段（如果需要）
        let hiddenFields = '';
        
        // 如果是 localization 表单，添加隐藏字段
        if (formType === 'localization') {
            // 这些值应该从上下文获取，这里用占位符表示
            hiddenFields += `<input type="hidden" name="return_to" value=${this.request.uri.url}></input>`;
        }

        // 获取块内容
        const blockContent = options.fn ? options.fn(this) : '';

        // 构建完整的表单
        const formHtml = `${formStart}${hiddenFields}${blockContent}</form>`;

        return new Handlebars.SafeString(formHtml);
    });
    // length 助手函数
    Handlebars.registerHelper("length",function (value, options) {
    try {
        // 处理不同类型的输入
        if (Array.isArray(value)) {
        // 如果是数组，返回数组长度
        return value.length;
        } else if (typeof value === 'string') {
        // 如果是字符串，返回字符串长度
        return value.length;
        } else if (value && typeof value === 'object' && value !== null) {
        // 如果是对象，返回对象属性数量
        return Object.keys(value).length;
        } else if (typeof value === 'number') {
        // 如果是数字，返回数字的字符串表示长度
        return value.toString().length;
        } else {
        // 其他情况返回 0
        return 0;
        }
    } catch (error) {
        console.error('length helper error:', error);
        return 0;
    }
    });
    // redirect_to​ 助手函数 -- 生成一个重定向链接
    Handlebars.registerHelper("redirect_to",function redirect_to(url) {
    // 直接返回传入的 URL，或进行一些基本处理
    if (!url) return '';
    // 可能会添加一些跟踪参数或处理特殊字符
    return url;
    });
    // append 助手函数
    Handlebars.registerHelper("append",function (...args) {
    try {
        // 获取 options 对象（通常是最后一个参数）
        const options = args[args.length - 1];

        // 获取实际的字符串参数（除了 options）
        const stringArgs = args.slice(0, -1);

        // 处理分隔符参数（如果在哈希参数中指定了 separator）
        let separator = '';
        if (options && options.hash && options.hash.separator) {
        separator = String(options.hash.separator);
        }

        // 过滤掉 null 和 undefined 值，并将所有参数转换为字符串
        const validStrings = stringArgs
        .filter(arg => arg !== null && arg !== undefined)
        .map(arg => String(arg));

        // 使用分隔符连接所有字符串
        return validStrings.join(separator);
    } catch (error) {
        console.error('append helper error:', error);
        return '';
    }
    });
    // useLink 助手函数
    Handlebars.registerHelper("useLink",function (linkJSON, query) {
        // preview=1&themeId=68a6a97362dcf056543a5631
        // /products/long-sleeve-sweatshirt-with-letter?  preview=1&themeId=68a6a97362dcf056543a5631
        // 检查输入参数
        if (!linkJSON || typeof linkJSON !== 'string') {
            return {
            hrefAttr: 'href="#"',
            finalSrc: '#'
            };
        }
        const link = JSON.parse(linkJSON);
        let href = '#';
        href = link.value;
        return {
            hrefAttr: `href="${href}"`,
            finalSrc: href
        };
    });
    // object_set
    // 设置对象的属性值
    // 参数:object: 要设置属性的对象key: 属性名value: 属性值returns: 修改后的对象
    Handlebars.registerHelper("object_set", function(object, key, value, options) {
        // 检查参数
        if (!object || typeof object !== 'object') {
            // 如果对象无效，创建一个新对象
            object = {};
        }
        // 确保 key 是字符串
        if (typeof key !== 'string') {
            key = String(key);
        }
        // 设置属性值
        object[key] = value;
        // 不返回任何值，仅用于设置对象属性
        return '';
    });
    // img_size 助手函数
    Handlebars.registerHelper("img_size",function (this:any,a, b, options) {
        if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
        }
        // 直接比较 a 和 b 的大小并返回结果
        return a < b;
        return util.value(a < b, this, options);
    });
    // inArray 助手函数
    Handlebars.registerHelper("inArray",function (this:any,array, value, options) {
        // 处理 undefined 和 null 情况
        if (value === undefined || value === null || array === null || array === undefined) {
            return false;
        }
        return util.value(util.indexOf(array, value) > -1, this, options);
    });
    // isEmpty 助手函数
    Handlebars.registerHelper("isEmpty", function(value, options) {
        // 处理 null 和 undefined
        if (value === null || value === undefined) {
            return true;
        }
        // 处理字符串
        if (typeof value === 'string') {
            return value.trim().length === 0;
        }
        // 处理数组
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        // 处理对象
        if (typeof value === 'object') {
            return Object.keys(value).length === 0;
        }
        // 处理数字和布尔值
        // 数字(包括0)和布尔值(false)不被认为是空值
        if (typeof value === 'number' || typeof value === 'boolean') {
            return false;
        }
        // 其他情况，默认不为空
        return false;
    });
    // itemAt助手函数
    Handlebars.registerHelper("itemAt", function (array, idx) {
        array = util.result(array);
        if (Array.isArray(array)) {
            idx = (typeof idx !== 'number' || isNaN(idx)) ? +idx : 0;
            if (idx < 0) {
            return array[array.length + idx];
            }
            if (idx < array.length) {
            return array[idx];
            }
        }
    });
    // obj_size 助手函数
    Handlebars.registerHelper("obj_size", function(obj) {
        if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj).length;
        }
        return 0;
    });
    // toInt 助手函数
    Handlebars.registerHelper("toInt", function(number) {
        return parseInt(number, 10);
    });
    // size 助手函数 返回字符串或数组的大小。
    Handlebars.registerHelper("size", function (value, options) {
        try {
            // 处理不同类型的输入
            if (Array.isArray(value)) {
            // 如果是数组，返回数组长度
            return value.length;
            } else if (typeof value === 'string') {
            // 如果是字符串，返回字符串长度
            return value.length;
            } else if (value && typeof value === 'object' && value !== null) {
            // 如果是对象，返回对象属性数量
            return Object.keys(value).length;
            } else if (typeof value === 'number') {
            // 如果是数字，返回数字的字符串表示长度
            return value.toString().length;
            } else {
            // 其他情况返回 0
            return 0;
            }
        } catch (error) {
            console.error('size helper error:', error);
            return 0;
        }
    });
    // Filters an array of objects based on a key-value pair or property value
    Handlebars.registerHelper("where", function(array, property, value, options) {
        // 检查输入参数
        if (!array) {
            return [];
        }
        // 确保 array 是数组
        if (!Array.isArray(array)) {
            // 如果是单个对象，转换为数组
            if (typeof array === 'object') {
            array = [array];
            } else {
            return [];
            }
        }
        // 如果只提供了两个参数 (array, property)，则 property 是一个对象，包含多个条件
        if (arguments.length === 3 && typeof property === 'object') {
            const conditions = property;
            options = value; // 第三个参数实际上是 options
            
            // 根据多个条件过滤数组
            return array.filter((item:any) => {
            // 检查对象是否满足所有条件
            return Object.keys(conditions).every(key => {
                if (typeof item === 'object' && item !== null) {
                // 支持点号分隔的嵌套属性访问
                if (key.includes('.')) {
                    const keys = key.split('.');
                    let result = item;
                    let found = true;
                    
                    for (let i = 0; i < keys.length; i++) {
                    const k = keys[i].trim();
                    if (result && typeof result === 'object' && k in result) {
                        result = result[k];
                    } else {
                        found = false;
                        break;
                    }
                    }
                    
                    return found && result === conditions[key];
                } else {
                    // 直接属性访问
                    return item[key] === conditions[key];
                }
                }
                return false;
            });
            });
        }
        // 标准用法: where array property value
        return array.filter((item:any) => {
            if (typeof item === 'object' && item !== null) {
            // 支持点号分隔的嵌套属性访问
            if (property.includes('.')) {
                const keys = property.split('.');
                let result = item;
                let found = true;
                
                for (let i = 0; i < keys.length; i++) {
                const k = keys[i].trim();
                if (result && typeof result === 'object' && k in result) {
                    result = result[k];
                } else {
                    found = false;
                    break;
                }
                }
                
                return found && result === value;
            } else {
                // 直接属性访问
                return item[property] === value;
            }
            }
            return false;
        });
    });
    // first 助手函数
    Handlebars.registerHelper("first", function(array, n) {
        // 数组未定义则返回空字符串
        if (util.isUndefined(array)) return '';
        // 当只传入数组时，返回数组第一个元素
        if (!util.isNumber(n)) {
            return array[0];
        }
        // 传入数组和数字n时，返回数组前n个元素组成的子数组
        return array.slice(0, n);
    });
    // capture 助手函数
    Handlebars.registerHelper('capture', function(this:any,name, options) {
        const content = options.fn(this);
        this[name] = content.trim();
        return '';
    });
    // decodeURI 助手函数
    Handlebars.registerHelper('decodeURI', function(uri, options) {
      try {
        // 检查参数
        if (uri === null || uri === undefined || typeof uri !== 'string') {
          return uri;
        }
        // 执行URI解码
        return decodeURI(uri);
      } catch (error) {
        console.error('decodeURI helper error:', error);
        // 出错时返回原始字符串
        return uri;
      }
    });
    // case 助手函数
    Handlebars.registerHelper('case', function(this:any,value, options) {
        // 保存原始上下文的引用
        const originalContext = this;
        const context = Object.create(this);
        context._case_value_ = value;
        context._case_matched_ = false;
        // 执行块内容
        const result = options.fn(context);
        // 将在case块内创建或修改的变量复制回原始上下文
        // 过滤掉内部使用的属性
        Object.keys(context).forEach(key => {
        if (!key.startsWith('_case_') && key !== '__proto__' && key !== 'constructor') {
            originalContext[key] = context[key];
        }
        });
        return result;
    });
    // when 助手函数
    Handlebars.registerHelper('when', function(this:any,...args) {
        // 获取options参数（最后一个参数）
        const options = args[args.length - 1];
        // 获取要比较的值（除了options之外的所有参数）
        const values = args.slice(0, -1);
        // 检查是否有匹配的值
        if (!this._case_matched_ && values.some(value => this._case_value_ == value)) {
        this._case_matched_ = true;
        return options.fn(this);
        }
        return '';
    });
    // typeOf 助手函数 用于类型判断
    Handlebars.registerHelper("typeOf", function(value) {
      // 处理 null 和 undefined 的特殊情况
      if (value === null) {
        return 'null';
      }
      
      if (value === undefined) {
        return 'undefined';
      }
      
      // 获取值的类型
      const type = typeof value;
      
      // 对于对象类型，进一步区分具体类型
      if (type === 'object') {
        // 检查是否为数组
        if (Array.isArray(value)) {
          return 'array';
        }
        
        // 检查是否为日期对象
        if (value instanceof Date) {
          return 'date';
        }
        
        // 检查是否为正则表达式
        if (value instanceof RegExp) {
          return 'regexp';
        }
        
        // 检查是否为普通对象
        if (Object.prototype.toString.call(value) === '[object Object]') {
          return 'object';
        }
        
        // 其他对象类型
        return 'object';
      }
      
      // 返回基本类型
      return type;
    });
    // rich_editor_format 助手函数 -- 图片加载
    Handlebars.registerHelper('rich_editor_format', function(content, options) {
        if (!content) return ''; 
        // 获取选项参数
        const hash = options && options.hash || {};
        const lazyLoadIframe = hash.lazyLoadIframe || false;
        // 处理富文本内容
        let formattedContent = content;
        return formattedContent;
    });
    // img_url 助手函数 - 用于生成和优化图片URL
    Handlebars.registerHelper("img_url", function(source, options) {
      try {
        // 检查输入参数
        if (!source) {
          return '';
        }
        // 获取选项参数
        const hash = options.hash || {};
        // 获取图片处理参数
        const width = hash.width;
        const height = hash.height;
        const scale = hash.scale;
        // 构建基础URL
        let imageUrl = source;
        // 如果有任何处理参数，则添加查询参数
        const params = [];
        if (width) {
          params.push(`width=${encodeURIComponent(width)}`);
        }
        if (height) {
          params.push(`height=${encodeURIComponent(height)}`);
        }
        if (scale) {
          params.push(`scale=${encodeURIComponent(scale)}`);
        }
        // 如果有参数需要添加
        if (params.length > 0) {
          const separator = imageUrl.includes('?') ? '&' : '?';
          imageUrl += separator + params.join('&');
        }
        return imageUrl;
      } catch (error) {
        console.error('img_url helper error:', error);
        return source || '';
      }
    });
    // filter 助手函数 - 过滤数组中的元素
    Handlebars.registerHelper('filter', function(this:any,array, value, options) {
      try {
        // 获取选项参数
        const hash = options.hash || {};
        const prop = hash.prop;
        // 检查输入参数
        if (!array || !Array.isArray(array)) {
          return '';
        }
        // 过滤数组
        const filteredArray = array.filter(item => {
          // 如果提供了属性名，检查该属性的值
          if (prop && typeof item === 'object' && item !== null) {
            return item[prop] === value;
          }
          // 如果没有提供属性名，直接比较元素值
          return item === value;
        });
        
        // 对过滤后的每个元素执行块内容
        if (options && typeof options.fn === 'function') {
          let result = '';
          filteredArray.forEach(item => {
            // 为每个元素创建上下文
            const context = {
              ...this,
              ...item
            };
            result += options.fn(context);
          });
          return result;
        }
        
        // 表达式调用返回过滤后的数组
        return filteredArray;
        
      } catch (error) {
        console.error('filter helper error:', error);
        return '';
      }
    });
    // javascript_template 助手函数 - 用于处理JavaScript模板
    Handlebars.registerHelper('javascript_template', function(template, context, options) {
      try {
        // 检查参数
        if (!template || typeof template !== 'string') {
          return '';
        }
    
        // 处理上下文参数
        let data:any = {};
        if (context && typeof context === 'object') {
          data = context;
        } else if (context && typeof context === 'string') {
          // 如果第二个参数是字符串，可能是正则表达式
          options = context;
        }
    
        // 处理选项参数
        let regexPattern = null;
        if (options && options.hash) {
          // 如果通过hash传入了正则表达式
          if (options.hash.flags) {
            regexPattern = new RegExp(options.hash.regex || '\\$\\{\\s*(\\w+)\\s*\\}', options.hash.flags);
          }
        }
    
        // 默认使用${key}格式的正则表达式
        if (!regexPattern) {
          regexPattern = /\$\{\s*(\w+)\s*\}/g;
        }
    
        // 执行模板替换
        let result = template;
        
        if (data && Object.keys(data).length > 0) {
          result = template.replace(regexPattern, (match, key) => {
            // 如果在上下文中找到了对应的键值，则替换
            if (data.hasOwnProperty(key)) {
              return data[key];
            }
            // 否则保留原样
            return match;
          });
        }
    
        return result;
      } catch (error) {
        console.error('javascript_template helper error:', error);
        return template || '';
      }
    });
    // switch 助手函数 
    Handlebars.registerHelper('switch', function(this:any,value, options) {
        // 保存原始上下文的引用
        const originalContext = this;
        // 创建一个新的上下文，用于在case和when助手之间共享状态
        const context = Object.create(this);
        context._switch_value_ = value;
        context._switch_matched_ = false;
        // 执行块内容，这将包含case和when助手
        const result = options.fn(context);
        // 将在switch块内创建或修改的变量复制回原始上下文
        // 过滤掉内部使用的属性
        Object.keys(context).forEach(key => {
            if (!key.startsWith('_switch_') && !key.startsWith('_case_') && key !== '__proto__' && key !== 'constructor') {
                originalContext[key] = context[key];
            }
        });
        return result;
    });
    // fallbackText 助手函数
    Handlebars.registerHelper("fallbackText", function (options) {
  
    });
    // toFloat 助手函数 - 将数字转换为浮点数
    Handlebars.registerHelper('toFloat', function(number) {
        return parseFloat(number);
    });
    // 创建一个新对象，可以传入属性键值对
    Handlebars.registerHelper("object_create", function(...args) {
        // 最后一个参数是Handlebars的options对象
        const options = args[args.length - 1];
        
        // 获取哈希参数（键值对）
        const hash = options.hash || {};
        
        // 创建一个新对象
        const obj = {};
        
        // 将哈希参数复制到新对象中
        Object.assign(obj, hash);

        // 返回创建的对象
        return obj;
    });
    // Dayjs助手函数 - 用于格式化日期
    Handlebars.registerHelper('dayjs', function(options) {
        // 获取参数
        const hash = options.hash || {};
        const method = hash.method;
        const init = hash.init;
        const format = hash.format;
        // 如果没有提供init值，返回空字符串
        if (!init) {
            return '';
        }
        // 创建dayjs对象
        let date = dayjs(init);
        // 根据method参数执行不同操作
        switch (method) {
            case 'format':
            // 格式化日期
            return date.format(format);
            default:
            // 默认返回ISO格式
            return date.toISOString();
        }
    });
    
}