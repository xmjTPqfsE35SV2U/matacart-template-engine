declare const util: {
    isString: (val: any) => val is string;
    isObject: (val: any) => boolean;
    isOptions: (val: any) => any;
    isUndefined: (val: any) => boolean;
    result: (val: any) => any;
    indexOf: (arr: any, item: any) => number;
    fn: (result: any, context: any, options: any) => any;
    inverse: (result: any, context: any, options: any) => any;
    value: (result: any, context: any, options: any) => any;
    isNumber: (value: any) => boolean;
    /**
     * 渲染指定模板文件
     * @param {string} templateName - 模板名称（相对路径）
     * @param {Object} context - 上下文数据
     * @param {Object} fileConfig - 文件配置对象
     * @returns {string} 渲染后的内容
     */
    renderTemplate: (handlebars: any, templateName: string, context: any, fileConfig: any) => any;
    getPageRange: (current: number, lastPage: number) => (string | number)[];
};
export default util;
//# sourceMappingURL=util.d.ts.map