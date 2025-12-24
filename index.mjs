// packages/my-hbs/index.mjs
// 引入 HBS 引擎对象
import { HbsTemplateEngine } from './lib/template-engine.ts';

// 引入国际化语言对象
import i18nManager from './lib/i18nManager.ts';

// 实例化 HBS 引擎对象
const hbsEngine = new HbsTemplateEngine();

// 默认导出
export default {
  myHbs:{
    HbsTemplateEngine: HbsTemplateEngine,
    render: hbsEngine.render.bind(hbsEngine),
    renderString: hbsEngine.renderString.bind(hbsEngine),
    renderFile: hbsEngine.renderFile.bind(hbsEngine),
    createSafeString: hbsEngine.createSafeString.bind(hbsEngine),
    compile: hbsEngine.compile.bind(hbsEngine),
    i18nManager: i18nManager,
  }
};