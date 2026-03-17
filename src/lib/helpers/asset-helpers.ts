import { getFileContent } from "../fileManager/fileContent";
export function registerAssetHelpers(Handlebars: typeof import('handlebars')) {
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
                if(process.env.STORE_DEV === 'true'){
                    url = `/project/assets/${filePath}.hbs`;
                }else{
                    const combineAssetTagFile = fileConfig.fileListMap?.[`assets/${filePath}.hbs`];
                    url = combineAssetTagFile.cdn_url
                }
                output += `<link rel="stylesheet" href="${url}">`;
            } else if (filePath.endsWith('.js')) {
                // 本地文件路径
                let url;
                if(process.env.STORE_DEV === 'true'){
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
        if(process.env.STORE_DEV === 'true'){
            url = `/project/assets/${normalizedPath}`;
        }else{
            const snippetsFile = fileConfig.fileListMap[`assets/${normalizedPath}`];
            url = snippetsFile?.cdn_url || ""
        }
        // 文件路径可能找不到
        return url;
    });
    // snippet片段助手函数
    Handlebars.registerHelper('snippet',function(this:any,content, options) {
        try {
            const fileConfig = options.data.root.fileConfig;
            const snippetsFileContent = getFileContent(`snippets/${content}.html`,fileConfig);
            const templateHtml = snippetsFileContent;
            // 将读取的文件内容作为 Handlebars 模板编译
            const template = Handlebars.compile(templateHtml);
            // 创建上下文数据
            const snippetContext: { [key: string]: any } = {}; // 从空对象开始，允许动态属性
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

}