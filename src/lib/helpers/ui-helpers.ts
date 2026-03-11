

// 导入section函数
import { section } from "../section";
import util from "./util";
export function registerUiHelpers(Handlebars: typeof import('handlebars')) {
    // 字体对象助手函数
    Handlebars.registerHelper('google_font_spec',function (content,options) {
        // 获取字体名称和变体
        const googleFontSpec = content || "";
        const [fontName, variant,style,weight] = googleFontSpec.split(':');
        // 创建字体对象
        const font = {
            "family": fontName??"",
            "variant": variant??"regular",
            "style": style??"normal",
            "weight": weight??"400"
        };
        // 返回字体对象
        return font;
    });
    // hex_2_rgb助手函数
    Handlebars.registerHelper("hex_2_rgb",function (hex) {
        if (!hex) return '255,255,255';
        hex = String(hex).replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map((char:any) => char + char).join('');
        }
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return r + ',' + g + ',' + b;
    });
    // image_responsive 助手函数
    Handlebars.registerHelper("image_responsive",function (src, options) {
        try {
            const imageSrc = src || '';
            // 获取哈希参数
            const hash = options.hash || {};
            const pcSize = hash.pcSize || '100vw';
            const mSize = hash.mSize || '100vw';
            const containerMaxWidth = hash.containerMaxWidth || null;
        
            // 生成 sizes 属性
            const generateSizes = () => {
            if (containerMaxWidth) {
                return `${pcSize}, ${mSize}, ${containerMaxWidth}px`
            }
            return `${pcSize}, ${mSize}`;
            };
            // 如果图片源为空，返回空属性
            if (!imageSrc) {
            return {
                srcAttr: '',
                srcsetAttr: '',
                sizesAttr: generateSizes()
            };
            }
            // 根据图片服务生成 srcset
            const generateSrcSetForService = (baseSrc:any) => {
            // 这里根据您的图片服务实现
            // 示例：支持宽度参数的图片服务
            const widths = [375, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2160, 2660, 2960, 3260, 3860];
            return widths.map(width => {
                let url = baseSrc;
                // 添加宽度参数（根据实际服务调整）
                if (url.includes('?')) {
                url += `&w=${width}`;
                } else {
                url += `?w=${width}`;
                }
                return `${url} ${width}w`;
            }).join(', ');
            };
            // 简单的 srcset（如果有不同尺寸的图片版本）
            // 这里假设您有预定义的不同尺寸图片
            const srcset = '';
            return {
            srcAttr: imageSrc,
            srcsetAttr: generateSrcSetForService(imageSrc),
            responsiveAttr: `data-src="${imageSrc}" data-srcset="${generateSrcSetForService(imageSrc)}" decoding="async" sizes="${generateSizes()}"`,
            sizesAttr: generateSizes()
            };
        } catch (error) {
            console.error('image_responsive helper error:', error);
            return {
                srcAttr: src || '',
                srcsetAttr: '',
                sizesAttr: '100vw'
            };
        }
    });
    // render
    // 渲染一个块或组件
    // 参数:
    // block: 要渲染的块对象
    // options: Handlebars 选项对象
    // returns: 渲染后的内容
    Handlebars.registerHelper("render", function(block, options) {
        try {
            // 检查参数
            if (!block || typeof block !== 'object') {
            return '';
            }
            // 获取块的类型
            const blockType = block.type;
            // 如果没有指定类型，尝试使用默认渲染方式
            if (!blockType) {
            // 如果块有 content 或 html 属性，直接返回
            if (block.content) {
                return new Handlebars.SafeString(block.content);
            }
            if (block.html) {
                return new Handlebars.SafeString(block.html);
            }
            return '';
            }
            // 最后回退到空字符串
            return '';
        } catch (error) {
            console.error('render helper error:', error);
            return '';
        }
    });
    // section 助手函数
    Handlebars.registerHelper('section',function(content, options,callback){
        const sectionHtml = section({
            key:content,
            sectionName:content,
            content:options,
            handlebarsInstance:Handlebars,
        });
        return sectionHtml;
    })
    // slot_content助手函数
    Handlebars.registerHelper("slot_content",function (this:any,name, options) {
        // 检查第一个参数是否是字符串
        const slotName = typeof name === 'string' ? name : 'default';
        // 检查插槽内容是否存在
        if(!this.__children){
            return;
        }
        try {
            if (!this.__children) {
            return '';
            }
            const content = this.__children[slotName];
            return content ? new Handlebars.SafeString(content) : '';
        } catch (error) {
            console.error('slot_content helper error:', error);
            return '';
        }
    });
    // child 助手函数
    Handlebars.registerHelper("child",function (this:any,name, options) {
        try{
            // 检查第一个参数是否是字符串
            const childName = (typeof name === 'string') ? name : 'default';
            if (options && typeof options.fn === 'function') {
            const content = options.fn(this);
            this.__children = this.__children || {};
            // 无论是否是 default，都存储到 __children
            this.__children[childName] = content;
            }
        }catch (error) {
            console.error('child helper error:', error);
        }
    });
    // sliceListByGrid 助手函数
    Handlebars.registerHelper("sliceListByGrid",function (list, pnum, num) {
        return list;
    });
    // include 助手函数
    Handlebars.registerHelper('include', function(this:any,templateName, options) {
        try {
        // 获取文件配置
        const fileConfig = options.data.root.fileConfig;
        // 创建上下文数据
        const includeContext = {};
        // 合并根上下文数据
        if (options.data && options.data.root) {
            Object.assign(includeContext, options.data.root);
        }
        // 合并当前上下文数据
        Object.assign(includeContext, this);
        // 合并传递的参数
        if (options.hash) {
            Object.assign(includeContext, options.hash);
        }
        // 渲染并返回指定模板
        const renderedContent = util.renderTemplate(Handlebars, templateName, includeContext, fileConfig);
        // 返回安全字符串
        return new Handlebars.SafeString(renderedContent);
        } catch (error) {
        console.error('Include helper error:', error);
        return '';
        }
    });
    /**
     * pagination 助手函数
     * 用于生成分页导航组件
     */
    Handlebars.registerHelper('pagination', function(options) {
        // 提取参数
        const {
            id = '',
            wrapperClass = '',
            total = 0,           // 总条目数
            pageSize = 20,       // 每页条目数
            current = 1,         // 当前页码
            isMobile = false,    // 是否移动端
            uri = {},            // 当前URI信息
            mode = 'normal'      // 分页模式 ('simple' | 'normal')
        } = options.hash;
    
        // 计算总页数
        const lastPageNum = Math.ceil(Number(total) / Number(pageSize)) || 1;
        
        // 确保当前页码在有效范围内
        const currentPage = Math.max(1, Math.min(Number(current), lastPageNum));
        
        // 解析当前URL查询参数
        // console.log('uri', uri);
        const url = new URL(String(uri.url || ''), 'http://localhost');
        const searchParams = new URLSearchParams(String(url.search));
        
        // 构建基础URL（不包含分页参数）
        searchParams.delete('page'); // 移除现有的分页参数
        const baseUrl = url.pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
        
        // 生成分页项
        const items = [];
        
        // 上一页
        if (currentPage > 1) {
            searchParams.set('page', String(currentPage - 1));
            items.push({
            type: 'pre',
            href: url.pathname + '?' + searchParams.toString(),
            current: currentPage,
            pagenum: currentPage - 1
            });
        }
        
        // 页码链接（普通模式）
        if (mode !== 'simple') {
            // 生成页码链接
            const pageRange = util.getPageRange(Number(currentPage), Number(lastPageNum));
            pageRange?.forEach((page:any) => {
            if (page === '...') {
                items.push({
                type: 'ellipsis'
                });
            } else {
                searchParams.delete('page');
                if (page !== 1) {
                    searchParams.set('page', page);
                }
                
                items.push({
                type: 'link',
                href: url.pathname + (searchParams.toString() ? '?' + searchParams.toString() : ''),
                current: currentPage,
                pagenum: page,
                active: page === currentPage
                });
            }
            });
        }
        // 下一页
        if (currentPage < lastPageNum) {
            searchParams.set('page', String(currentPage + 1));
            items.push({
                type: 'next',
                href: url.pathname + '?' + searchParams.toString(),
                current: currentPage,
                pagenum: currentPage + 1
            });
        }
        
        // 构建传递给模板的数据上下文
        const context = {
            id,
            wrapperClass,
            total,
            pageSize,
            current: currentPage,
            isMobile,
            uri,
            mode,
            lastPageNum,
            items
        };
        
        // 执行块内容并返回结果
        return options.fn(context);
    });

}