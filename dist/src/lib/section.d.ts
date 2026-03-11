import { Handlebars } from "./helper";
/**
 * Section helper function - 模拟 section 标签功能
 * @param {string} sectionName - section 名称
 * key - section id
 * @param {Object} context - 上下文数据
 * @returns {string} 渲染后的 HTML 内容
 */
interface sectionType {
    key: string;
    sectionName: string;
    content: any;
    handlebarsInstance: any;
}
export declare function section({ key, sectionName, content, handlebarsInstance }: sectionType): any;
export declare function getSection({ sectionsData, sectionID, fileConfig, globaleData }: any): Promise<Handlebars.SafeString>;
export {};
//# sourceMappingURL=section.d.ts.map