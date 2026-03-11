import { getFileContent } from "./fileManager/fileContent";
import { Handlebars } from "./helper";
/**
 * Section helper function - 模拟 section 标签功能
 * @param {string} sectionName - section 名称
 * key - section id
 * @param {Object} context - 上下文数据
 * @returns {string} 渲染后的 HTML 内容
 */
interface sectionType{
    key:string,
    sectionName:string,
    content:any,
    handlebarsInstance:any
}

export function section({key, sectionName, content, handlebarsInstance}:sectionType){
    const Handlebars = handlebarsInstance;
    // 上下文对象
    let newContent;
    // section 配置
    if(sectionName == 'announcement-bar' || sectionName == 'footer' || sectionName == 'header'){
        newContent = {
            ...content.data.root,
            section:{
                id:key,
                ...content.data.root.sections[sectionName]
            }
        }
    }else{
        newContent = {...content}
    }
    try {
        // ？？？
        // 读取模板文件
        const templateContent = getFileContent(`sections/${sectionName}.html`,newContent.fileConfig);
        // 提取元数据
        const metaData = extractMetaData(templateContent)
        // 同时移除 Front Matter 部分
        let sectionTemplate = templateContent.replace(/^---[\s\S]*?---\s*\n/, '');
        // 提取 schema 数据  默认数据
        const sectionSchemaData = extractSchema(sectionTemplate);
        // 移除 schema 部分，只保留模板内容
        sectionTemplate = sectionTemplate.replace(/{{#schema}}[\s\S]*?{{\/schema}}/, '');
        // 补充默认数据settings
        sectionSchemaData.settings?.forEach((item:any) => {
            if((newContent.section.settings?.[item.id] == undefined || newContent.section.settings?.[item.id] == null) && (item.default!==undefined)){
                newContent.section.settings[item.id] = item.default;
            }
        });
        // 补充默认数据blocks
        sectionSchemaData.blocks?.forEach((block:any) => {
            block.settings?.forEach((item:any) => {
                if(newContent.section?.blocks){
                    Object.entries(newContent.section.blocks).forEach(([blockKey,blockData]:[string,any]) => {
                        if(blockData.type == block.type){
                            if((newContent.section.blocks[blockKey].settings[item.id] == undefined || newContent.section.blocks[blockKey].settings[item.id] == null) && (item.default!==undefined)){
                                newContent.section.blocks[blockKey].settings[item.id] = item.default;
                            }
                            // 补充id
                            newContent.section.blocks[blockKey].id = blockKey;
                        }
                    });
                }else{
                    newContent.section.blocks={}
                }
            });
        });
        const template = Handlebars.compile(sectionTemplate);
        const renderedHTML = template(newContent);
        return new Handlebars.SafeString(`<div id=shopline-section-${key} class="shopline-section">${renderedHTML}</div>`);
    }catch (error) {
        console.error(`Error rendering section "${sectionName}"`);
        console.error(error);
        return new Handlebars.SafeString(`<!-- Section "${sectionName}" failed to render -->`);
    }
}

// 提取 schema 数据的函数
function extractSchema(templateContent:string) {
    const schemaMatch = templateContent.match(/{{#schema}}([\s\S]*?){{\/schema}}/);
    if (schemaMatch) {
        try {
            return JSON.parse(schemaMatch[1].trim());
        } catch (error) {
            console.warn('解析 schema 失败:', error);
            return null;
        }
    }
    return null;
}

// 提取元数据的函数
function extractMetaData(templateContent:string){
    // 匹配 Front Matter (YAML 格式)
}


// 返回section片段
export async function getSection({sectionsData,sectionID,fileConfig,globaleData}:any) {
    const sectionName = sectionsData.type;
    // 读取模板文件
    const templateContent = getFileContent(`sections/${sectionName}.html`,fileConfig);
    // 提取元数据
    const metaData = extractMetaData(templateContent);
    // 同时移除 Front Matter 部分
    let sectionTemplate = templateContent.replace(/^---[\s\S]*?---\s*\n/, '');
    // 提取 schema 数据  默认数据
    const sectionSchemaData = extractSchema(sectionTemplate);
    // 移除 schema 部分，只保留模板内容
    sectionTemplate = sectionTemplate.replace(/{{#schema}}[\s\S]*?{{\/schema}}/, '');
    // 编辑section数据
    let newContent = {
        ...globaleData,
        section:{
            id:sectionID,
            ...sectionsData
        },
        fileConfig:fileConfig
    }
    // 补充默认数据settings
    sectionSchemaData?.settings?.forEach((item:any) => {
        if((newContent.section.settings?.[item.id] == undefined || newContent.section.settings?.[item.id] == null) && (item.default!==undefined)){
            newContent.section.settings[item.id] = item.default;
        }
    });
    // 补充默认数据blocks
    sectionSchemaData?.blocks?.forEach((block:any) => {
        block.settings?.forEach((item:any) => {
            if(newContent.section?.blocks){
                Object.entries(newContent.section.blocks).forEach(([blockKey,blockData]:[string,any]) => {
                    if(blockData.type == block.type){
                        if((newContent.section.blocks[blockKey].settings[item.id] == undefined || newContent.section.blocks[blockKey].settings[item.id] == null) && (item.default!==undefined)){
                            newContent.section.blocks[blockKey].settings[item.id] = item.default;
                        }
                        // 补充id
                        newContent.section.blocks[blockKey].id = blockKey;
                    }
                });
            }else{
                newContent.section.blocks={}
            }
        });
    });
    // 编译模板
    const template = Handlebars.compile(sectionTemplate);
    const renderedHTML = template(newContent);
    return new Handlebars.SafeString(`${renderedHTML}`);
}
