import Handlebars from 'handlebars';
import { registerStringHelpers } from './helpers/string-helpers';
import { registerConditionHelpers } from './helpers/condition-helpers';
import { registerMathHelpers } from './helpers/math-helpers';
import { registerCoreHelpers } from './helpers/core-helpers';
import { registerAssetHelpers  } from './helpers/asset-helpers';
import { registerArrayHelpers  } from './helpers/array-helpers';
import { registerEcommerceHelpers } from './helpers/ecommerce-helpers';
import { registerUiHelpers } from './helpers/ui-helpers';
import { registerInternalObjectsHelpers } from './helpers/internal-objects-helpers';

// 注册所有助手函数
export function registerAllHelpers() {
  registerStringHelpers(Handlebars);
  registerConditionHelpers(Handlebars);
  registerMathHelpers(Handlebars);
  registerCoreHelpers(Handlebars);
  registerAssetHelpers(Handlebars);
  registerArrayHelpers(Handlebars);
  registerEcommerceHelpers(Handlebars);
  registerUiHelpers(Handlebars);
  registerInternalObjectsHelpers(Handlebars);

  // 注册 helperMissing 来捕获未注册的助手函数调用 -- 防止静默失败的问题
  Handlebars.registerHelper('helperMissing', function(...args: any[]) {
    const options = args[args.length - 1];
    if (options && options.name) {
      const helperName = options.name;

      let templateInfo = '';
      if (options.data && options.data.root) {
        // 尝试从上下文获取更多信息
        templateInfo = options.data.root.filePath || options.data.root.templateName || 'unknow';
      }
      console.error(`Missing helper "${helperName}" in template: ${templateInfo}`);
    }
    return undefined;
  });
}

// 执行注册
registerAllHelpers();

// 导出Handlebars全局对象
export { Handlebars };

