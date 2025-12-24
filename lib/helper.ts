import { getFileContent } from "./fileManager/fileContent";
import Handlebars from 'handlebars';
import striptags from 'striptags';
// 导入section函数
import { section } from "./section";
// 导入i18nManager对象
import i18nManager from "./i18nManager";

// 自定义isFalsy函数
function isFalsy(value: any): boolean {
  return !value || value === 0 || value === '' || Number.isNaN(value);
}
// 类型检查辅助函数
const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};
const isString = (value) => {
  return typeof value === 'string';
};

// ------------助手函数shian 添加自定义helper

// t​ 从区域设置文件中返回给定翻译键的已翻译文本字符串。
// 参数​
// String 区域设置文件中的key
// returns {String} 已翻译文本字符串
Handlebars.registerHelper("t",function (key, options) {
  // 检查 key 是否有效
  if (key === undefined || key === null) {
    return '';
  }

  const keys = key.split('.');

  let current = i18nManager.I18nData;
  // 查找翻译文本
  for(const key of keys){
    if(current && (current[key] !== undefined)) {
      current = current[key];
    } else {
      current = undefined; // 路径不存在
      break;
    }
  }
  // {{t 'products.product_list.one_product_num' num=products.realTotal}}
  // 如果找到翻译文本且是字符串
  if (typeof current === 'string' && options.hash) {
    let translated = current;
    // 1. 先处理三重花括号占位符：{{{placeholder}}}
    for (const [placeholder, value] of Object.entries(options.hash)) {
      const regex = new RegExp(`{\\{\\{\\s*${placeholder}\\s*\\}\\}\\}`, 'g');
      translated = translated.replace(regex, value || key);
    }
    // 2. 再处理双重花括号占位符：{{placeholder}}
    for (const [placeholder, value] of Object.entries(options.hash)) {
      const regex = new RegExp(`{\\{\\s*${placeholder}\\s*\\}\\}`, 'g');
      translated = translated.replace(regex, Handlebars.Utils.escapeExpression(value??key));
    }
    if(translated){
      return new Handlebars.SafeString(translated);
    }
  }
  return current || key;
});

// snippet片段助手函数
Handlebars.registerHelper('snippet',function(content, options) {
  try {
    const fileConfig = options.data.root.fileConfig;
    const snippetsFileContent = getFileContent(`snippets/${content}.html`,fileConfig);
    const templateHtml = snippetsFileContent;
    // 将读取的文件内容作为 Handlebars 模板编译
    const template = Handlebars.compile(templateHtml);
    // 创建上下文数据
    const snippetContext = {}; // 从空对象开始
    // 合并根上下文数据
    if (options?.data && options.data.root) {
      Object.assign(snippetContext, options.data.root);
    }
    // 合并当前上下文数据（会覆盖根上下文中的同名属性）
    Object.assign(snippetContext, this);
    // 合并传递的参数
    if (options?.hash) {
      Object.assign(snippetContext, options.hash);
    }
    // 创建子内容对象 默认为空
    snippetContext.__children = {};
    // 执行子模板（仅一次），使用 snippetContext 作为上下文
    let slotContent = '';
    if (options.fn) {
      slotContent = options.fn(snippetContext);
    }
    // 关键：如果没有使用 child 助手，则将整个子模板内容作为默认插槽
    if (Object.keys(snippetContext.__children).length === 0) {
      snippetContext.__children.default = slotContent;
    }
    // 渲染模板
    const renderedContent = template(snippetContext);
    // 将渲染后的内容作为 SafeString 返回
    const safeString = new Handlebars.SafeString(renderedContent);
    return safeString;
  } catch (error) {
    console.log('文件路径:', `snippets/${content}.html`);
    console.error('错误信息:', error);
    return '';
  }
});

// 字体对象助手函数
Handlebars.registerHelper('google_font_spec',function (content,options) {
  // 获取字体名称和变体
  const googleFontSpec = content || "";
  const [fontName, variant,style,weight] = googleFontSpec.split(':');
  // 创建字体对象
  const font = {
    "family": fontName??"",
    "variant": variant??"regular",
    "style": style??"normal",
    "weight": weight??"400"
  };
  
  // 返回字体对象
  return font;
});

// get助手函数
Handlebars.registerHelper('get',function (propertyPath, object, options) {
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

// hex_2_rgb助手函数
Handlebars.registerHelper("hex_2_rgb",function (hex) {
  if (!hex) return '255,255,255';
  hex = String(hex).replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r + ',' + g + ',' + b;
});

// divide助手函数
Handlebars.registerHelper("divide",function (numA, numB) {
  return Math.floor(numA / numB);
});

// lte助手函数
Handlebars.registerHelper("lte",function (value1, value2) {
  // 直接返回第二个值，实现"将第二个值赋值给第一个值"的功能
  return value2;
});

// add助手函数
Handlebars.registerHelper("add",function (...args) {
  const values = args.slice(0, -1);
  // 计算所有参数的和
  return values.reduce((sum, value) => {
    return sum + Number(value || 0);
  }, 0);
});

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
Handlebars.registerHelper("boolean", function (...args) {
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
      const operatorMap = {
        '==': (a, b) => a == b,
        '===': (a, b) => a === b,
        '!=': (a, b) => a != b,
        '!==': (a, b) => a !== b,
        '>': (a, b) => a > b,
        '>=': (a, b) => a >= b,
        '<': (a, b) => a < b,
        '<=': (a, b) => a <= b,
        '&&': (a, b) => a && b,
        '||': (a, b) => a || b
      };
      // 检查操作符是否有效
      if (!operatorMap[operator]) {
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

// 在 Handlebars 中注册 minus 助手函数
Handlebars.registerHelper("minus",function (value1, value2) {
  // 将参数转换为数字并执行减法运算
  const num1 = Number(value1);
  const num2 = Number(value2);
  // 返回第一个数减去第二个数的结果
  return num1 - num2;
});

// assets_url助手函数
Handlebars.registerHelper('assets_url',function (assetPath, options) {
  // 确保 assetPath 是字符串
  if (typeof assetPath !== 'string') {
    return '';
  }
  // 处理路径，确保格式正确
  let normalizedPath = assetPath.trim();
  const fileConfig = options.data.root.fileConfig;

  let url;
  if(process.env.NEXT_PUBLIC_MOCK_MODE === 'true'){
    url = `/project/assets/${normalizedPath}`;
  }else{
    const snippetsFile = fileConfig.fileListMap[`assets/${normalizedPath}`];
    url = snippetsFile?.cdn_url || ""
  }
  // 文件路径可能找不到
  return url;
});

// 自定义if助手函数
Handlebars.registerHelper('if', function (...args) {
    // 获取 options 对象（通常是最后一个参数）
    const options = args[args.length - 1];

    // 判断是否为块级调用
    const isBlockCall = typeof options === 'object' && options.fn;

    // 操作符
    let operatorMap;
    if (args.length == 4) {
      // 获取 options 对象（通常是最后一个参数）
      operatorMap = {
        '==': function (v1, v2) { return v1 == v2; },
        '===': function (v1, v2) { return v1 === v2; },
        '!=': function (v1, v2) { return v1 != v2; },
        '!==': function (v1, v2) { return v1 !== v2; },
        '>': function (v1, v2) { return v1 > v2; },
        '<': function (v1, v2) { return v1 < v2; },
        '>=': function (v1, v2) { return v1 >= v2; },
        '<=': function (v1, v2) { return v1 <= v2; },
        'and': function (v1, v2) { return v1 && v2; },
        'or': function (v1, v2) { return v1 || v2; },
        'contains': function (v1, v2) {
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
      }
    }

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

// assign助手函数
Handlebars.registerHelper('assign',function (key, value, options) {
  // 在当前上下文中创建变量
  this[key] = value;
  return '';
});

// default助手函数
Handlebars.registerHelper("default",function (value, defaultValue, options) {
  try {
    // 处理参数
    // 如果第三个参数是 options（Handlebars 的 options 对象）
    if (!options && typeof defaultValue === 'object' && defaultValue.hash) {
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

// sanitize助手函数
Handlebars.registerHelper("sanitize", function(str) {
  if (typeof str !== 'string') return '';
  return striptags(str).trim();
});

// isFalsey助手函数 -- 兼容后代模板
Handlebars.registerHelper("isFalsey",function (...args) {
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
Handlebars.registerHelper("and",function () {
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

// useFallbackLang助手函数
Handlebars.registerHelper("useFallbackLang",function (content, locale, options) {
  try {
    // 检查参数
    if (content === null || content === undefined) {
      return '';
    }
    // 如果 content 是字符串，直接返回
    if (typeof content === 'string') {
      return content;
    }

    // 如果 content 是对象，根据语言环境获取对应的内容
    if (typeof content === 'object' && !Array.isArray(content)) {
      // 优先级顺序：
      // 1. 使用传入的 locale 参数
      if (locale && content[locale]) {
        return content[locale];
      }

      // 2. 使用上下文中的语言环境
      if (this.request && this.request.locale && content[this.request.locale]) {
        return content[this.request.locale];
      }

      // 3. 语言回退顺序
      const fallbackLocales = ['en', 'zh', 'zh-CN', 'zh-TW', 'default'];
      for (const fallbackLocale of fallbackLocales) {
        if (content[fallbackLocale]) {
          return content[fallbackLocale];
        }
      }

      // 4. 返回第一个可用的值
      const keys = Object.keys(content);
      if (keys.length > 0) {
        return content[keys[0]];
      }
    }
    // 其他情况转换为字符串返回
    return "";
  } catch (error) {
    console.error('useFallbackLang helper error:', error);
    return '';
  }
});

// combine_asset_tag助手函数
Handlebars.registerHelper('combine_asset_tag',function () {

  const args = Array.from(arguments);
  
  let options = args[args.length - 1]; // 最后一个参数是 Handlebars 的 options 对象
  let filePaths = args.slice(0, -1); // 其余参数是文件路径

  // 提取配置选项
  const config = {
    inline: options.hash.inline || false,
    type: options.hash.type || null,
    defer: options.hash.defer || false
  };

  let output = '';

  // 文件对象
  const fileConfig = options.data.root.fileConfig;
  if (config.inline) {
    // 内联模式：将文件内容直接嵌入到页面中
    filePaths.forEach(filePath => {
      try {
        if (filePath.endsWith('.css')) {
          const combineAssetTagFileContent = getFileContent(`assets/${filePath}.hbs`,fileConfig);
          output += `<style>${combineAssetTagFileContent}</style>`;
        } else if (filePath.endsWith('.js')) {
          const combineAssetTagFileContent = getFileContent(`assets/${filePath}`,fileConfig);
          output += `<script>${combineAssetTagFileContent}</script>`;
        }
      } catch (error) {
        console.error(`Error reading file: ${filePath}`, error);
      }
    });
  } else {
    // 链接模式：生成链接标签
    filePaths.forEach(filePath => {
      // 获取文件对象
      if (filePath.endsWith('.css')) {
        let url;
        if(process.env.NEXT_PUBLIC_MOCK_MODE === 'true'){
          url = `/project/assets/${filePath}.hbs`;
        }else{
          const combineAssetTagFile = fileConfig.fileListMap?.[`assets/${filePath}.hbs`];
          url = combineAssetTagFile.cdn_url
        }
        output += `<link rel="stylesheet" href="${url}">`;
      } else if (filePath.endsWith('.js')) {
        // 本地文件路径
        let url;
        if(process.env.NEXT_PUBLIC_MOCK_MODE === 'true'){
          url = `/project/assets/${filePath}`;
        }else{
          const combineAssetTagFile = fileConfig.fileListMap[`assets/${filePath}`];
          url = combineAssetTagFile.cdn_url
        }
        let scriptTag = `<script src="${url}"`;
        if (config.type) {
          scriptTag += ` type="${config.type}"`;
        }
        if (config.defer) {
          scriptTag += ` defer="defer"`;
        }
        scriptTag += '></script>';
        output += scriptTag;
      }
    });
  }
  // 创建 SafeString 
  const safeString = new Handlebars.SafeString(output);
  return safeString;
});

// preload_state助手函数 -- 预加载 数据，将数据存储在 window 对象中
Handlebars.registerHelper('preload_state', function (...args) {
  try {
    // 获取 options 对象（通常是最后一个参数）
    const options = args[args.length - 1];
    // 获取实际的参数（除了 options）
    const stateKeys = args.slice(0, -1);
    
    // 生成预加载脚本 (无论是否为块级调用都要生成脚本)
    let scriptContent = '<script>';
    scriptContent += 'window.__PRELOAD_STATE__ = window.__PRELOAD_STATE__ || {};';

    // 创建状态对象树
    const stateTree = {};

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
        let current = stateTree;
        
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

// replace 助手函数
Handlebars.registerHelper("replace",function (str, a, b) {
  if (typeof str !== 'string') return '';
  if (typeof a !== 'string') return str;
  if (typeof b !== 'string') b = '';
  return str.split(a).join(b);
});

// section 助手函数
Handlebars.registerHelper('section',function(content, options,callback){
  const sectionHtml = section({
      key:content,
      sectionName:content,
      content:options,
      handlebarsInstance:Handlebars,
  });
  return sectionHtml;
})

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
Handlebars.registerHelper('form', function (...args) {
  // 获取参数
  const options = args[args.length - 1]; // 最后一个是 Handlebars 的 options 对象
  const formType = args[0]; // 表单类型，如 "localization", "customer" 等
  const attrs = args.slice(1, -1); // 中间的参数作为额外属性
  
  // 初始化表单属性
  let formAttributes = {
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

// or 助手函数
Handlebars.registerHelper("or",function () {
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

// child 助手函数
Handlebars.registerHelper("child",function (name, options) {
  try{
    // 检查第一个参数是否是字符串
    const childName = (typeof name === 'string') ? name : 'default';
    if (options && typeof options.fn === 'function') {
      const content = options.fn(this);
      this.__children = this.__children || {};
      // 无论是否是 default，都存储到 __children
      this.__children[childName] = content;
    }
  }catch (error) {
    console.error('child helper error:', error);
  }
});

// has 助手函数
Handlebars.registerHelper("has",function (value, pattern, options) {
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

// redirect_to​ 助手函数 -- 生成一个重定向链接
Handlebars.registerHelper("redirect_to",function redirect_to(url) {
  // 直接返回传入的 URL，或进行一些基本处理
  if (!url) return '';
  // 可能会添加一些跟踪参数或处理特殊字符
  return url;
});

// slot_content助手函数
Handlebars.registerHelper("slot_content",function (name, options) {
  // 检查第一个参数是否是字符串
  const slotName = typeof name === 'string' ? name : 'default';
  // 检查插槽内容是否存在
  if(!this.__children){
    return;
  }
  try {
    if (!this.__children) {
      return '';
    }
    const content = this.__children[slotName];
    return content ? new Handlebars.SafeString(content) : '';
  } catch (error) {
    console.error('slot_content helper error:', error);
    return '';
  }
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

// isTruthy助手函数
Handlebars.registerHelper("isTruthy",function (...args) {
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

// navLink 助手函数 -- 导航项
Handlebars.registerHelper("navLink",function (navItem, query, locale, allCollections, options) {
  // 获取导航节点对象
  try {
    // 检查输入参数
    if (!navItem || typeof navItem !== 'object') {
      return {
        name: '',
        hrefAttr: '',
        finalSrc: ''
      };
    }
    // 默认返回对象
    const result = {
      name: navItem.name || '',
      url: '',
      path: '',
      coverImg : null,
      target: '_self',
      hrefAttr: '',
    };

    const urlLocale =  (locale && locale !== 'en') ? `/${locale}` : '';

    // 处理不同类型的导航项 nodeType导航节点 1表示是首页
    if (navItem.nodeType === 1) {
      result.name = navItem.name.default;
      result.url = `${urlLocale}/`;
      result.path = `${urlLocale}/`;
      result.coverImg = navItem.img ? navItem.img : null;
      result.target = '_self',
      result.hrefAttr = `href="${urlLocale}/" target="_self"`;
    } else if (navItem.nodeType === 9) {
      result.name = navItem.name.default;
      result.url = `${urlLocale}/collections-all`;
      result.path = `${urlLocale}/collections-all`;
      result.coverImg = navItem.img ? navItem.img : null;
      result.target = '_self',
      result.hrefAttr = `href="${urlLocale}/collections-all" target="_self"`;
    } else if (navItem.nodeType === 7) {
      // 产品链接
      result.name = navItem.name.default;
      result.url = `${urlLocale}/collections`;
      result.path = `${urlLocale}/collections`;
      result.coverImg = null;
      result.target = '_self',
      result.hrefAttr = `href="${urlLocale}/collections" target="_self"`;
    } else if (navItem.nodeType === 4) {
      // 博客链接
      result.name = navItem.name.default;
      result.url = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
      result.path = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
      result.coverImg = null;
      result.target = '_self',
      result.hrefAttr = `href="${urlLocale}/blogs/collectioncustomizepath/customizepath" target="_self"`;
    } else {
      // 默认处理
      result.name = navItem.name.default;
      result.coverImg = null;
      result.target = '_self',
      result.hrefAttr = `href='/'`
    }
    return result;


  } catch (error) {
    console.error('navLink helper error:', error);
    return {
      name: '',
      hrefAttr: 'href="#"',
      finalSrc: '#'
    };
  }
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

// uppercase助手函数
Handlebars.registerHelper("uppercase",function (str) {
  if (isObject(str) && str.fn) {
    return str.fn(this).toUpperCase();
  }
  if (!isString(str)) return '';
  return str.toUpperCase();
});

// product_blocks_order_translate助手函数
Handlebars.registerHelper("product_blocks_order_translate",function (list, v1, v2) {
  let newList = []
  if (list[v1] && list[v2]) {
    list[v2].forEach(item => {
      list[v1][item] && newList.push(list[v1][item])
    })
  }
  return newList
});

// after 助手函数
Handlebars.registerHelper("after",function (array, n) {
  if (array == null) return '';
  return array.slice(n);
});
// not 助手函数
Handlebars.registerHelper("not",function (val, options) {
  return !val;
});

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

// trim 助手函数
Handlebars.registerHelper("trim",function (str, options) {
  // 检查输入是否为字符串
  if (typeof str === 'string') {
    // 使用 JavaScript 原生的 trim() 方法移除字符串两侧的空白字符
    return str.trim();
  }
  // 如果不是字符串，直接返回原值
  return str;
})



export { Handlebars };