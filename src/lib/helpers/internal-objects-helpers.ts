
export function registerInternalObjectsHelpers(Handlebars: typeof import('handlebars')) {
    // year 助手函数 - 获取年份
    Handlebars.registerHelper('year', function(options) {
        return new Date().getFullYear();
    });
}
