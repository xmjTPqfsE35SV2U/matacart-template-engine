import { section } from "./section";
import { Handlebars } from "./helper";

// 根据 JSON 数据动态生成模板内容
export async function generateTemplateFromJson(data:any,globaleData:any) {
    let dynamicTemplate = "";
    if(data.sections){
      // 遍历 sections 对象的所有键
      for(const item of data?.order){
        const key = item;
        const sectionConfig = data.sections[item];
        try {
          // 确保 section 配置有类型
          if (sectionConfig && typeof sectionConfig === 'object' && 'type' in sectionConfig) {
            // 调用 section 函数渲染对应的内容
            const sectionContent = await section({
              key:key,
              sectionName: sectionConfig.type as string,
              content: {
                ...globaleData,
                section:{
                  id:key,
                  ...sectionConfig
                }
              }, // 添加全局数据到上下文
              handlebarsInstance: Handlebars
            });
            dynamicTemplate += sectionContent;
          } else {
            console.warn(`Section [${key}] 缺少类型信息`);
          }
        } catch (error) {
          console.error(`Section "${key}" 渲染失败:`, error);
          dynamicTemplate += `<div class="section-warp error">Section "${key}" 渲染失败</div>`;
        }
      }
      // 如果存在 wrapper 配置，则包裹一层元素
      if (data.wrapper) {
        let tag = '';
        let id = '';
        const classParts = [];

        // 1️⃣ 优先提取ID部分（#）
        const idIndex = data.wrapper.indexOf('#');
        if (idIndex !== -1) {
          id = data.wrapper.substring(idIndex + 1);
          const beforeId = data.wrapper.substring(0, idIndex);
          if (beforeId) {
            const parts = beforeId.split('.');
            tag = parts[0];
            if (parts.length > 1) {
              classParts.push(...parts.slice(1));
            }
          }
        } else {
          const parts = data.wrapper.split('.');
          tag = parts[0];
          if (parts.length > 1) {
            classParts.push(...parts.slice(1));
          }
        }

        // 2️⃣ 处理ID中可能包含的类名
        if (id && id.includes('.')) {
          const idParts = id.split('.');
          id = idParts[0];
          classParts.push(...idParts.slice(1));
        }

        // 3️⃣ 构建属性字符串
        const classAttr = classParts.length > 0 ? ` class="${classParts.join(' ')}"` : '';
        const idAttr = id ? ` id="${id}"` : '';
        dynamicTemplate = `<${tag}${idAttr}${classAttr}>${dynamicTemplate}</${tag}>`;
      }
    }
    return new Handlebars.SafeString(dynamicTemplate);
}