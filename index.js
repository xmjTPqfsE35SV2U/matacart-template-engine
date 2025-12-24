// packages/my-hbs/index.js

// 引入HBS引擎对象
const { HbsTemplateEngine } = require('./lib/template-engine');

// 引入国际化语言对象
const i18nManager = require('./lib/i18nManager');

// 创建HBS引擎实例
const hbsEngine = new HbsTemplateEngine();

// 导出类和默认实例方法
module.exports = {
  myHbs:{
    HbsTemplateEngine: HbsTemplateEngine,
    render: hbsEngine.render.bind(hbsEngine),
    renderString: hbsEngine.renderString.bind(hbsEngine),
    renderFile: hbsEngine.renderFile.bind(hbsEngine),
    createSafeString: hbsEngine.createSafeString.bind(hbsEngine),
    compile: hbsEngine.compile.bind(hbsEngine),
    i18nManager:i18nManager,
  }
};