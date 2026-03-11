
export function registerArrayHelpers(Handlebars: typeof import('handlebars')) {
    // 简化
    Handlebars.registerHelper("array-slice",function (value, start, end, options) {
        try {
            // 处理参数
            const args = Array.from(arguments);
            const opts = typeof args[args.length - 1] === 'object' && args[args.length - 1].hash ? args[args.length - 1] : {};
            const params = opts.hash ? args.slice(0, -1) : args;

            let target, startIndex, endIndex;

            // 确定参数
            if (params.length === 1) {
            // 只传入目标值
            target = params[0];
            startIndex = 0;
            endIndex = undefined;
            } else if (params.length === 2) {
            // 传入目标值和起始索引
            target = params[0];
            startIndex = params[1];
            endIndex = undefined;
            } else if (params.length === 3) {
            // 传入目标值、起始索引和结束索引
            target = params[0];
            startIndex = params[1];
            endIndex = params[2];
            } else {
                console.warn('slice: Invalid number of arguments');
                return '';
            }

            // 处理索引参数
            const startIdx = parseInt(startIndex) || 0;
            const endIdx = endIndex !== undefined ? (parseInt(endIndex) || 0) : undefined;

            // 根据目标值类型进行切片
            if (Array.isArray(target)) {
            // 数组切片
            if (endIdx !== undefined) {
                return target.slice(startIdx, endIdx);
            } else {
                return target.slice(startIdx);
            }
            } else if (typeof target === 'string') {
            // 字符串切片
            if (endIdx !== undefined) {
                return target.slice(startIdx, endIdx);
            } else {
                return target.slice(startIdx);
            }
            } else {
            // 其他类型转换为字符串后切片
            const str = String(target);
            if (endIdx !== undefined) {
                return str.slice(startIdx, endIdx);
            } else {
                return str.slice(startIdx);
            }
            }
        } catch (error) {
            console.error('slice helper error:', error);
            return '';
        }
    });
    // isArray 助手函数
    Handlebars.registerHelper("isArray", function (value) {
        return Array.isArray(value);
    });
    // array_map 助手函数
    Handlebars.registerHelper("array_map", function (this:any,result, array, value, options) {
        // 检查参数
        if (!array) {
            // 如果数组为空或未定义，设置空数组
            this[result] = [];
            return '';
        }
        const newResult = array.map((res:any)=>{
            return res[value]
        })
        this[result] = newResult;
    });
    // arrayify 助手函数
    Handlebars.registerHelper("arrayify", function(value) {
      return value ? (Array.isArray(value) ? value : [value]) : [];
    });
    // last 辅助函数 - 获取数组中的最后一个元素
    Handlebars.registerHelper("last", function(array) {
      try {
        // 检查输入参数
        if (!array) {
          return undefined;
        }
        
        // 检查是否为数组
        if (!Array.isArray(array)) {
          // 如果不是数组但有length属性（如类数组对象），尝试处理
          if (array.length !== undefined) {
            return array[array.length - 1];
          }
          // 如果是单个值，直接返回
          return array;
        }
        
        // 返回数组的最后一个元素
        if (array.length > 0) {
          return array[array.length - 1];
        }
        
        // 空数组返回undefined
        return undefined;
      } catch (error) {
        console.error('last helper error:', error);
        return undefined;
      }
    });
    // array_find_index 辅助函数 - 在数组中查找具有特定属性值的对象，并返回其索引
    Handlebars.registerHelper("array_find_index", function(array, value, property) {
      try {
        // 检查输入参数
        if (!array || !Array.isArray(array)) {
          return -1;
        }
        
        // 如果未提供属性参数，则直接在数组元素中查找值
        if (property === undefined) {
          for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
              return i;
            }
          }
        } else {
          // 如果提供了属性参数，则在数组元素的指定属性中查找值
          for (let i = 0; i < array.length; i++) {
            // 检查数组元素是否具有指定属性，并且该属性值等于给定值
            if (array[i] && array[i][property] === value) {
              return i;
            }
          }
        }
        
        // 如果未找到匹配项，返回-1
        return -1;
      } catch (error) {
        console.error('array_find_index helper error:', error);
        return -1;
      }
    });
    // pluck 辅助函数 - 从对象数组中提取指定属性的值
    Handlebars.registerHelper("pluck", function(array, property) {
      try {
        // 检查输入参数
        if (!array || !Array.isArray(array)) {
          return [];
        }
        
        // 检查属性参数
        if (!property || typeof property !== 'string') {
          return [];
        }
        
        // 从数组中的每个对象提取指定属性的值
        const result = [];
        for (let i = 0; i < array.length; i++) {
          // 检查数组元素是否为对象且具有指定属性
          if (array[i] && typeof array[i] === 'object' && array[i].hasOwnProperty(property)) {
            result.push(array[i][property]);
          }
        }
        
        return result;
      } catch (error) {
        console.error('pluck helper error:', error);
        return [];
      }
    });
    // find-in-array 助手函数 - 在数组中查找具有特定属性值的元素
    Handlebars.registerHelper('find-in-array', function(this:any,array, value, property, options) {
      try {
        // 检查输入参数
        if (!array || !Array.isArray(array)) {
          // 块级调用返回 inverse，表达式调用返回 false
          if (options && typeof options.fn === 'function') {
            return options.inverse ? options.inverse(this) : '';
          }
          return false;
        }
        
        // 查找匹配的元素
        const found = array.find(item => {
          // 如果提供了属性名，检查该属性的值
          if (property && typeof item === 'object' && item !== null) {
            return item[property] === value;
          }
          // 如果没有提供属性名，直接比较元素值
          return item === value;
        });
        
        // 块级调用处理
        if (options && typeof options.fn === 'function') {
          if (found) {
            // 创建新的上下文，包含找到的元素
            const context = {
              ...this,
              ...found
            };
            return options.fn(context);
          } else {
            // 没有找到匹配项，执行 inverse 块
            return options.inverse ? options.inverse(this) : '';
          }
        }
        
        // 表达式调用直接返回找到的元素或 undefined
        return found || null;
        
      } catch (error) {
        console.error('find-in-array helper error:', error);
        
        // 出错时的处理
        if (options && typeof options.fn === 'function') {
          return options.inverse ? options.inverse(this) : '';
        }
        return false;
      }
    });
    // array-push 助手函数
    Handlebars.registerHelper('array-push', function(this:any,array,object,options) {
      // 检查是否提供了数组参数
      if (!array) {
        array = [];
      }
      // 确保 array 是数组类型
      if (!Array.isArray(array)) {
        array = [array];
      }
      // 获取要添加的元素（来自块级内容或哈希参数）
      let itemToAdd;
      if (options && object) {
        itemToAdd = object;
      } else if (typeof options === 'object' && options.fn) {
        // 如果通过块级内容传递元素
        itemToAdd = options.fn(this);
      }
      // 将元素添加到数组中
      if (itemToAdd !== undefined) {
        array.push(itemToAdd);
      }
      // 如果是块级助手，执行块级内容
      if (options && typeof options === 'function') {
        return options(array);
      }
      // 返回修改后的数组
      return "";
    });
    
    // itemAt 助手函数
    
}


