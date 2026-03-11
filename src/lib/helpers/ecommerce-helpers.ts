
// 导入产品例
import productList from './productList';
// 导入i18nManager对象
import i18nManager from "../i18nManager";
export function registerEcommerceHelpers(Handlebars: typeof import('handlebars')) {
    // t​ 从区域设置文件中返回给定翻译键的已翻译文本字符串。
    // 参数​
    // String 区域设置文件中的key
    // returns {String} 已翻译文本字符串
    Handlebars.registerHelper("t",function (key, options) {
        // 检查 key 是否有效
        if (key === undefined || key === null) {
            return '';
        }

        const keys = key.split('.');

        let current = i18nManager.I18nData;
        // 查找翻译文本
        for(const key of keys){
            if(current && (current[key] !== undefined)) {
            current = current[key];
            } else {
            current = undefined; // 路径不存在
            break;
            }
        }
        // {{t 'products.product_list.one_product_num' num=products.realTotal}}
        // 如果找到翻译文本且是字符串
        if (typeof current === 'string' && options.hash) {
            let translated = current;
            // 1. 先处理三重花括号占位符：{{{placeholder}}}
            for (const [placeholder, value] of Object.entries(options.hash)) {
            const regex = new RegExp(`{\\{\\{\\s*${placeholder}\\s*\\}\\}\\}`, 'g');
            translated = translated.replace(regex, value || key);
            }
            // 2. 再处理双重花括号占位符：{{placeholder}}
            for (const [placeholder, value] of Object.entries(options.hash)) {
            const regex = new RegExp(`{\\{\\s*${placeholder}\\s*\\}\\}`, 'g');
            translated = translated.replace(regex, Handlebars.Utils.escapeExpression(value??key));
            }
            if(translated){
            return new Handlebars.SafeString(translated);
            }
        }
        return current || key;
    });
    // useFallbackLang助手函数
    Handlebars.registerHelper("useFallbackLang",function (this:any,content, locale, options) {
        try {
            // 检查参数
            if (content === null || content === undefined) {
            return '';
            }
            // 如果 content 是字符串，直接返回
            if (typeof content === 'string') {
            return content;
            }

            // 如果 content 是对象，根据语言环境获取对应的内容
            if (typeof content === 'object' && !Array.isArray(content)) {
            // 优先级顺序：
            // 1. 使用传入的 locale 参数
            if (locale && content[locale]) {
                return content[locale];
            }

            // 2. 使用上下文中的语言环境
            if (this.request && this.request.locale && content[this.request.locale]) {
                return content[this.request.locale];
            }

            // 3. 语言回退顺序
            const fallbackLocales = ['en', 'zh', 'zh-CN', 'zh-TW', 'default'];
            for (const fallbackLocale of fallbackLocales) {
                if (content[fallbackLocale]) {
                return content[fallbackLocale];
                }
            }

            // 4. 返回第一个可用的值
            const keys = Object.keys(content);
            if (keys.length > 0) {
                return content[keys[0]];
            }
            }
            // 其他情况转换为字符串返回
            return "";
        } catch (error) {
            console.error('useFallbackLang helper error:', error);
            return '';
        }
    });
    /**
     * 用于货币转换和价格格式化
     * ????? 需要改进 小数
     */
    Handlebars.registerHelper("money_exchange_convert_price", function(price, options) {
        // 获取当前货币代码和汇率信息
        const currencyCode = options.data.root.currencyCode || 'USD';
        // 汇率映射表（实际项目中应该从API或配置获取）
        const exchangeRates = options.data.root.currencyRates;
        // 当前货币符号映射
        const currencySymbols  = options.data.root.currencyConfig.currencyDetailList.filter((item:any)=>item.currencyCode == currencyCode) || [];
        // 获取当前货币符号
        const currencySymbol = currencySymbols.length > 0 ? currencySymbols[0].currencySymbol : '';
        // // 获取汇率
        const rate = exchangeRates[currencyCode] || 1;
        // 转换价格
        let convertedPrice = parseFloat(price) * rate;
        // 处理精度（不同货币可能有不同的小数位要求）
        const precision = (currencyCode === 'JPY') ? 0 : 2;
        convertedPrice = Number(convertedPrice.toFixed(precision));
        // 提取整数部分和小数部分
        const integerPart = Math.floor(convertedPrice).toString();
        const fractionPart = (precision > 0) ? (convertedPrice - Math.floor(convertedPrice)).toFixed(precision).substring(2) : '';
        // 创建上下文对象供内部助手函数使用
        const context = {
            integer: integerPart,
            fraction: fractionPart,
            currencyCode: currencyCode,
            currencySymbol: currencySymbol,
            convertedPrice: convertedPrice
        };
        // 执行块内的内容并返回结果
        return options.fn(context);
    });
    // money_exchange_convert_with_currency 助手函数 --- 待调整 货币
    Handlebars.registerHelper("money_exchange_convert_with_currency",function (this:any,money) {
        // 获取货币
        const currency = this.currencyCode;
        if (money || money == 0) {
            return `$` + Number(money) / 100 + ` ${currency}`;
        }
        return ""
    });
    // product_blocks_order_translate助手函数
    Handlebars.registerHelper("product_blocks_order_translate",function (list, v1, v2) {
    let newList:any = []
    if (list[v1] && list[v2]) {
        list[v2].forEach((item:any) => {
        list[v1][item] && newList.push(list[v1][item])
        })
    }
    return newList
    });
    // product_mock_data助手函数
    Handlebars.registerHelper("product_mock_data",function (count, imageCount) {
        // 生成模拟产品数据
        // 确保参数是数字
        const productCount = Number(count) || 0;
        const imgCount = Number(imageCount) || 1;
        // 如果目标数量为0或数组为空，返回空数组
        if (productCount <= 0 || productList.list.length === 0) {
            return [];
        }
        // 如果数组长度正好等于目标数量，直接返回原数组
        if (productList.list.length === productCount) {
            return productList.list.slice();
        }
        // 如果数组长度大于目标数量，截取前targetCount个元素
        if (productList.list.length > productCount) {
            return productList.list.slice(0, productCount);
        }
        // 如果数组长度小于目标数量，需要循环补充
        const result = [];
        for (let i = 0; i < productCount; i++) {
            // 使用取模运算实现循环
            result.push(productList.list[i % productList.list.length]);
        }
        return result;
    });
    /**
     * navigation_to_category 助手函数
     * 将导航数据转换为分类结构，获取指定分类的子分类列表
     * 兼容Shopline和Shopify平台
     * 
     * @param {Object} all_collections - 所有分类数据对象
     * @param {Object} navigation - 导航数据对象
     * @param {string} sortationId - 当前分类ID
     * @returns {Array} 子分类列表
     */
    Handlebars.registerHelper("navigation_to_category", function(all_collections, navigations, sortationId) {
        // 检查两个对象是否都存在且不为空
        const isNavigationsValid = navigations && Object.prototype.toString.call(navigations) === '[object Object]' && Object.keys(navigations).length > 0;
        const isAllCollectionsValid = all_collections && Object.prototype.toString.call(all_collections) === '[object Object]' && Object.keys(all_collections).length > 0;
        if (!isNavigationsValid || !isAllCollectionsValid) {
            return {
            finalShowCategories:[],
            finalShowChildCategories:[],
            allShowCategoryIds:[]
            }
        }
        // sortationId 12271184648462242121701040
    });
    // navLink 助手函数 -- 导航项
    Handlebars.registerHelper("navLink",function (navItem, query, locale, allCollections, options) {
        // 获取导航节点对象
        try {
            // 检查输入参数
            if (!navItem || typeof navItem !== 'object') {
            return {
                name: '',
                hrefAttr: '',
                finalSrc: ''
            };
            }
            // 默认返回对象
            const result = {
            name: navItem.name || '',
            url: '',
            path: '',
            coverImg : null,
            target: '_self',
            hrefAttr: '',
            };

            const urlLocale =  (locale && locale !== 'en') ? `/${locale}` : '';

            // 处理不同类型的导航项 nodeType导航节点 1表示是首页
            if (navItem.nodeType === 1) {
            result.name = navItem.name.default;
            result.url = `${urlLocale}/`;
            result.path = `${urlLocale}/`;
            result.coverImg = navItem.img ? navItem.img : null;
            result.target = '_self',
            result.hrefAttr = `href="${urlLocale}/" target="_self"`;
            } else if (navItem.nodeType === 9) {
            result.name = navItem.name.default;
            result.url = `${urlLocale}/collections-all`;
            result.path = `${urlLocale}/collections-all`;
            result.coverImg = navItem.img ? navItem.img : null;
            result.target = '_self',
            result.hrefAttr = `href="${urlLocale}/collections-all" target="_self"`;
            } else if (navItem.nodeType === 7) {
            // 产品链接
            result.name = navItem.name.default;
            result.url = `${urlLocale}/collections`;
            result.path = `${urlLocale}/collections`;
            result.coverImg = null;
            result.target = '_self',
            result.hrefAttr = `href="${urlLocale}/collections" target="_self"`;
            } else if (navItem.nodeType === 4) {
            // 博客链接
            result.name = navItem.name.default;
            result.url = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
            result.path = `${urlLocale}/blogs/collectioncustomizepath/customizepath`;
            result.coverImg = null;
            result.target = '_self',
            result.hrefAttr = `href="${urlLocale}/blogs/collectioncustomizepath/customizepath" target="_self"`;
            } else {
            // 默认处理
            result.name = navItem.name.default;
            result.coverImg = null;
            result.target = '_self',
            result.hrefAttr = `href='/'`
            }
            return result;


        } catch (error) {
            console.error('navLink helper error:', error);
            return {
            name: '',
            hrefAttr: 'href="#"',
            finalSrc: '#'
            };
        }
    });
    // product_collections_sidebar_isEmpty 助手函数
    Handlebars.registerHelper("product_collections_sidebar_isEmpty", function(blocks, product_tags, child_category_list, navigations) {
        // Check if there are any filter blocks defined
        const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
        // Check if there are any product tags available
        const hasProductTags = product_tags && (
            (Array.isArray(product_tags) && product_tags.length > 0) || 
            (typeof product_tags === 'object' && Object.keys(product_tags).length > 0)
        );
        
        // Check if there are any child categories
        const hasChildCategories = child_category_list && (
            (Array.isArray(child_category_list) && child_category_list.length > 0) ||
            (typeof child_category_list === 'object' && Object.keys(child_category_list).length > 0)
        );
        
        // Check if there are any navigations
        const hasNavigations = navigations && (
            (Array.isArray(navigations) && navigations.length > 0) ||
            (typeof navigations === 'object' && Object.keys(navigations).length > 0)
        );
        
        // Sidebar is considered empty if none of the above conditions are met
        return !(hasBlocks || hasProductTags || hasChildCategories || hasNavigations);
    });
    // Filters product tags based on specified criteria and group
    Handlebars.registerHelper("product_collections_tags_filter", function(product_tags, filter_tags, group) {
        // Return empty array if no product tags exist
        if (!product_tags) {
            return [];
        }
        // Convert product_tags to array if it's an object
        let tagsArray = [];
        if (Array.isArray(product_tags)) {
            tagsArray = product_tags;
        } else if (typeof product_tags === 'object') {
            // If it's an object, extract values or keys depending on structure
            tagsArray = Object.values(product_tags);
        }
        // If no filter tags specified, return all tags in the group
        if (!filter_tags || !Array.isArray(filter_tags) || filter_tags.length === 0) {
            // Filter tags by group if group is specified
            if (group) {
            return tagsArray.filter(tag => {
                // Assuming tag objects have a group property
                if (typeof tag === 'object' && tag.group !== undefined) {
                return tag.group == group;
                }
                // If tag is a string, we can't filter by group
                return true;
            }).map(tag => {
                // Extract tag name from object or return as is
                if (typeof tag === 'object' && tag.name) {
                return tag.name;
                }
                return tag;
            });
            }
            // If no group specified, return all tags
            return tagsArray.map(tag => {
            if (typeof tag === 'object' && tag.name) {
                return tag.name;
            }
            return tag;
            });
        }
        // Filter tags that match the specified filter_tags
        const filteredTags = tagsArray.filter(tag => {
            const tagName = typeof tag === 'object' ? tag.name : tag;
            
            // Check if tag belongs to the specified group (if group is provided)
            const isInGroup = group ? 
            (typeof tag === 'object' ? tag.group == group : true) : 
            true;
            
            // Check if tag is in the filter list
            const isInFilter = filter_tags.some(filterTag => {
            if (typeof filterTag === 'object') {
                return filterTag.name === tagName;
            }
            return filterTag === tagName;
            });
            
            return isInGroup && isInFilter;
        }).map(tag => {
            if (typeof tag === 'object' && tag.name) {
            return tag.name;
            }
            return tag;
        });
        return filteredTags;
    });
    // product_collections_tag_in_active 助手函数 用于检查当前过滤标签是否在激活状态
    Handlebars.registerHelper("product_collections_tag_in_active", function(activeTags, allTags) {
        // 如果没有激活的标签，直接返回 false
        if (!activeTags || activeTags.length === 0) {
            return false;
        }
        // 如果没有可用标签，返回 false
        if (!allTags || allTags.length === 0) {
            return false;
        }
        // 检查激活的标签是否存在于所有标签中
        // 将 activeTags 转换为数组（如果是字符串）
        const activeTagsArray = Array.isArray(activeTags) ? activeTags : [activeTags];
        // 检查是否有任何激活的标签在所有标签列表中
        return activeTagsArray.some(activeTag => {
            // 如果 allTags 是对象数组，检查 name 属性
            if (typeof allTags[0] === 'object' && allTags[0] !== null) {
                return allTags.some((tagObj:any) => 
                    tagObj.name === activeTag || 
                    tagObj.handle === activeTag ||
                    tagObj.title === activeTag
                );
            } 
            // 如果 allTags 是字符串数组，直接比较
            else {
                return allTags.includes(activeTag);
            }
        });
    });
    // product_collections_tag_link 助手函数
    Handlebars.registerHelper("product_collections_tag_link", function(tag, action, currentUrl) {
        // 解析当前URL
        const url = new URL(currentUrl.url, 'http://localhost'); // 使用基础域名以避免解析错误
        // /collections?tags=girl&themeId=68b8ec016860762344066382&preview=1&page_num=1
        const searchParams = url.searchParams;
        // 获取当前已有的标签
        let currentTags:any[] = [];
        if (searchParams.has('tags')) {
            const tagsValue = searchParams.get('tags');
            currentTags = tagsValue ? tagsValue.split(',') : [];
        }
        
        // 新标签
        let newTags = [];
        switch (action) {
            case 'add':
                // 添加标签到现有标签列表
                newTags = [...currentTags, tag];
                break;
            case 'remove':
                // 从现有标签列表中移除指定标签
                newTags = currentTags.filter(t => t !== tag);
                break;
            case 'single':
                // 单选模式：只保留当前标签
                newTags = [tag];
                break;
            default:
                newTags = currentTags;
        }
        // 构建新的URL参数
        const newUrl = new URL(url); // 或者使用 url.href
        if (newTags.length > 0) {
            // 将标签转换为 constraint 参数格式
            newUrl.searchParams.set('tag', newTags.join(","));
        } else {
            // 如果没有标签，移除 constraint 参数
            newUrl.searchParams.delete('tag');
        }
        // 保持其他查询参数不变
        return newUrl.toString().replace('http://localhost', '');
    });
    // product_share_info 助手函数 - 生成产品的分享信息，用于SEO和社交分享
    // productSeo: 产品的SEO信息对象
    // spu: 产品的SPU信息对象
    // uri: 当前页面的URI信息
    // storeInfo: 商店信息对象
    Handlebars.registerHelper("product_share_info", function(productSeo, spu, uri, storeInfo, options) {
      try {
        // 初始化返回对象
        const shareInfo = {
          title: '',
          description: '',
          url: '',
          image: ''
        };
    
        // 设置标题
        if (productSeo && productSeo.title) {
          shareInfo.title = productSeo.title;
        } else if (spu && spu.title) {
          // 如果没有SEO标题，使用产品标题
          shareInfo.title = spu.title;
        } else if (storeInfo && storeInfo.name) {
          // 如果没有产品标题，使用商店名称
          shareInfo.title = storeInfo.name;
        }
    
        // 设置描述
        if (productSeo && productSeo.desc) {
          shareInfo.description = productSeo.desc;
        } else if (storeInfo && storeInfo.description) {
          shareInfo.description = storeInfo.description;
        }
    
        // 设置URL
        if (uri) {
          if (typeof uri === 'string') {
            shareInfo.url = uri;
          } else if (uri.href) {
            shareInfo.url = uri.href;
          } else if (uri.url) {
            shareInfo.url = uri.url;
          }
        }
    
        // 设置图片
        if (productSeo && productSeo.image) {
          shareInfo.image = productSeo.image;
        } else if (spu && spu.images && spu.images.length > 0) {
          // 使用第一个产品图片
          shareInfo.image = spu.images[0];
        }
    
        return shareInfo;
      } catch (error) {
        console.error('product_share_info helper error:', error);
        return {
          title: '',
          description: '',
          url: '',
          image: ''
        };
      }
    });
    // product_default_sku 助手函数 - 选择产品的默认SKU
    // 根据参数选择产品的默认SKU
    // skuList: 产品SKU列表
    // soldOut: 产品是否售罄
    // querySku: 查询参数中的SKU ID
    // isFirstSku: 是否选择第一个SKU
    // notChooseSku: 是否未选择SKU
    // isPreviewProduct: 是否为预览产品
    Handlebars.registerHelper("product_default_sku", function(skuList, soldOut, querySku, isFirstSku, notChooseSku, isPreviewProduct, options) {
      try {
        // 检查参数
        if (!skuList || !Array.isArray(skuList)) {
          return {};
        }
    
        // 初始化返回对象
        const result = {
          selectSku: null,
          minPriceSku: null,
          firstSku: null
        };
    
        // 如果产品已售罄，直接返回空结果
        if (soldOut) {
          return result;
        }
    
        // 查找查询参数中的SKU
        if (querySku) {
          const querySkuItem = skuList.find(sku => sku.skuSeq === querySku);
          if (querySkuItem && querySkuItem.available) {
            result.selectSku = querySkuItem;
            return result;
          }
        }
    
        // 查找第一个可用SKU
        const firstAvailableSku = skuList.find(sku => sku.available);
        if (firstAvailableSku) {
          result.firstSku = firstAvailableSku;
        }
    
        // 如果不是预览产品且需要选择第一个SKU
        if (!isPreviewProduct && isFirstSku && firstAvailableSku) {
          result.selectSku = firstAvailableSku;
        }
    
        // 查找最低价格SKU
        let minPriceSku:any = null;
        skuList.forEach(sku => {
          if (sku.available) {
            if (!minPriceSku || sku.price < minPriceSku.price) {
              minPriceSku = sku;
            }
          }
        });
        result.minPriceSku = minPriceSku;
    
        // 如果不需要选择SKU或者SKU未选择，使用最低价格SKU
        if (notChooseSku && minPriceSku) {
          result.selectSku = minPriceSku;
        }
    
        return result;
      } catch (error) {
        console.error('product_default_sku helper error:', error);
        return {};
      }
    });
    // product_microdata 辅助函数 - 生成产品的结构化数据（microdata）
    // selectSku: 选中的SKU信息
    // sku: 产品SKU信息对象
    // spu: 产品SPU信息对象
    // uri: 当前页面的URI信息
    // currency: 货币信息
    Handlebars.registerHelper("product_microdata", function(selectSku, sku, spu, uri, currency, options) {
      try {
        // 初始化返回对象
        const microdata = {
          title: '',
          productId: '',
          productUrl: '',
          description: '',
          brand: '',
          sku: '',
          gtin: '',
          price: '',
          currency: '',
          availability: '',
          imageUrl: ''
        };
    
        // 设置产品标题
        if (spu && spu.title) {
          microdata.title = spu.title;
        }
    
        // 设置产品ID
        if (spu && spu.spuSeq) {
          microdata.productId = spu.spuSeq;
        }
    
        // 设置产品URL
        if (uri) {
          if (typeof uri === 'string') {
            microdata.productUrl = uri;
          } else if (uri.href) {
            microdata.productUrl = uri.href;
          } else if (uri.url) {
            microdata.productUrl = uri.url;
          }
        }
    
        // 设置产品描述
        if (spu && spu.description) {
          microdata.description = spu.description;
        }
    
        // 设置品牌
        if (spu && spu.brand) {
          microdata.brand = spu.brand;
        }
    
        // 设置SKU
        if (selectSku && selectSku.skuSeq) {
          microdata.sku = selectSku.skuSeq;
        } else if (sku && sku.skuList && sku.skuList.length > 0) {
          // 如果没有选中的SKU，使用第一个SKU
          microdata.sku = sku.skuList[0].skuSeq;
        }
    
        // 设置GTIN（全球贸易项目代码）
        if (selectSku && selectSku.barcode) {
          microdata.gtin = selectSku.barcode;
        } else if (sku && sku.skuList && sku.skuList.length > 0 && sku.skuList[0].barcode) {
          microdata.gtin = sku.skuList[0].barcode;
        }
    
        // 设置价格
        if (selectSku && selectSku.price !== undefined) {
          microdata.price = selectSku.price;
        } else if (sku && sku.skuList && sku.skuList.length > 0) {
          microdata.price = sku.skuList[0].price;
        }
    
        // 设置货币
        if (currency && currency.code) {
          microdata.currency = currency.code;
        }
    
        // 设置库存状态
        let availability = 'https://schema.org/InStock'; // 默认有库存
        if (spu && spu.soldOut) {
          availability = 'https://schema.org/SoldOut';
        } else if (selectSku && selectSku.soldOut) {
          availability = 'https://schema.org/SoldOut';
        } else if (selectSku && selectSku.infiniteStock) {
          availability = 'https://schema.org/InStock';
        } else if (selectSku && selectSku.allowOversold) {
          availability = 'https://schema.org/InStock';
        } else if (selectSku && selectSku.stock !== undefined && selectSku.stock <= 0) {
          availability = 'https://schema.org/SoldOut';
        }
        microdata.availability = availability;
    
        // 设置图片URL
        if (selectSku && selectSku.imageList && selectSku.imageList.length > 0) {
          microdata.imageUrl = selectSku.imageList[0];
        } else if (spu && spu.images && spu.images.length > 0) {
          microdata.imageUrl = spu.images[0];
        }
    
        return microdata;
      } catch (error) {
        console.error('product_microdata helper error:', error);
        return {
          title: '',
          productId: '',
          productUrl: '',
          description: '',
          brand: '',
          sku: '',
          gtin: '',
          price: '',
          currency: '',
          availability: '',
          imageUrl: ''
        };
      }
    });
    // money_format 助手函数 - 格式化货币显示
    Handlebars.registerHelper("money_format", function(price, options) {
      try {
        // 如果价格为空或无效，返回空字符串
        if (price === null || price === undefined || price === '') {
          return '';
        }
    
        // 转换价格为数字
        const numericPrice = parseFloat(price);
        
        // 检查价格是否为有效数字
        if (isNaN(numericPrice)) {
          return '';
        }
    
        // 获取货币代码和符号（如果在上下文中可用）
        let currencyCode = 'USD';
        let currencySymbol = '$';
        
        // 尝试从上下文获取货币信息
        if (options && options.data && options.data.root) {
          const root = options.data.root;
          if (root.currencyCode) {
            currencyCode = root.currencyCode;
          }
          if (root.currencyConfig && root.currencyConfig.currencyDetailList) {
            const currencyDetail = root.currencyConfig.currencyDetailList.find((item:any) => item.currencyCode === currencyCode);
            if (currencyDetail && currencyDetail.currencySymbol) {
              currencySymbol = currencyDetail.currencySymbol;
            }
          }
        }
    
        // 根据货币代码确定小数位数
        const precision = (currencyCode === 'JPY') ? 0 : 2;
        
        // 格式化价格
        const formattedPrice = numericPrice.toFixed(precision);
        
        // 分离整数和小数部分
        const parts = formattedPrice.split('.');
        const integerPart = parts[0];
        const fractionPart = parts[1] || '';
        
        // 添加千位分隔符
        const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // 根据货币符号位置返回格式化结果
        if (precision > 0) {
          return `${currencySymbol}${integerWithCommas}.${fractionPart}`;
        } else {
          return `${currencySymbol}${integerWithCommas}`;
        }
      } catch (error) {
        console.error('money_format helper error:', error);
        return price;
      }
    });
    // product_sku_price 助手函数 - 获取产品SKU的价格信息
    Handlebars.registerHelper("product_sku_price", function(sku, spu, options) {
        try {
        // 初始化返回对象
        const priceInfo = {
            originPrice: 0,
            salesPrice: 0,
            discount: 0
        };

        // 获取SKU价格信息
        let skuPrice = 0;
        let skuOriginPrice = 0;
        let skuDiscount = 0;
        
        if (sku) {
            // 如果提供了SKU，使用SKU的价格信息
            skuPrice = sku.price || 0;
            skuDiscount = sku.discount || 0;
            skuOriginPrice = sku.originPrice || skuPrice;
        } else if (spu) {
            // 如果没有提供SKU但提供了SPU，使用SPU的价格信息
            skuPrice = spu.productMinPrice || spu.price || 0;
            skuDiscount = spu.discount || 0;
            skuOriginPrice = spu.originPrice || skuPrice;
        }

        // 设置价格信息
        priceInfo.salesPrice = skuPrice;
        priceInfo.originPrice = skuOriginPrice;
        priceInfo.discount = skuDiscount;

        return priceInfo;
        } catch (error) {
        console.error('product_sku_price helper error:', error);
        return {
            originPrice: 0,
            salesPrice: 0,
            discount: 0,
        };
        }
    });
    // product_sku_map2array 助手函数 - 将产品SKU属性映射转换为数组格式
    Handlebars.registerHelper("product_sku_map2array", function(skuAttributeMap, selectedSku, options) {
      try {
        // 检查输入参数
        if (!skuAttributeMap || typeof skuAttributeMap !== 'object') {
          return [];
        }
    
        // 初始化结果数组
        const result:any[] = [];
        
        // 将skuAttributeMap对象转换为数组格式
        Object.keys(skuAttributeMap).forEach(attrId => {
          const attribute = skuAttributeMap[attrId];
          if (!attribute) return;
          
          // 创建规格属性对象
          const specAttr = {
            nameId: attrId,
            specName: attribute.defaultName || '',
            hidden: attribute.hidden || false,
            specAttrList: [] as Array<{
              id: string;
              name: string;
              imgUrl: string;
              active: boolean;
            }>,
            onlyShowAttrImg: false
          };
          
          // 处理规格属性值列表
          if (attribute.skuAttributeValueMap && typeof attribute.skuAttributeValueMap === 'object') {
            const attrValueList:Array<{
              id: string;
              name: string;
              imgUrl: string;
              active: boolean;
            }> = [];
            Object.keys(attribute.skuAttributeValueMap).forEach(valueId => {
              const value = attribute.skuAttributeValueMap[valueId];
              if (!value) return;
              
              const attrItem = {
                id: `${attrId}:${valueId}`,
                name: value.defaultValue || '',
                imgUrl: value.imgUrl || '',
                active: false
              };
              
              attrValueList.push(attrItem);
            });
            
            // 按照attributeValueWeight排序
            attrValueList.sort((a, b) => {
              const aValue = attribute.skuAttributeValueMap[a.id.split(':')[1]];
              const bValue = attribute.skuAttributeValueMap[b.id.split(':')[1]];
              const aWeight = aValue ? (aValue.attributeValueWeight || 0) : 0;
              const bWeight = bValue ? (bValue.attributeValueWeight || 0) : 0;
              return aWeight - bWeight;
            });
            
            specAttr.specAttrList = attrValueList;
            // 检查是否所有属性值都有图片
            specAttr.onlyShowAttrImg = attrValueList.every(item => item.imgUrl);
          }
          
          result.push(specAttr);
        });
        
        // 按照attributeWeight排序
        result.sort((a, b) => {
          const aAttr = skuAttributeMap[a.nameId];
          const bAttr = skuAttributeMap[b.nameId];
          const aWeight = aAttr ? (aAttr.attributeWeight || 0) : 0;
          const bWeight = bAttr ? (bAttr.attributeWeight || 0) : 0;
          return aWeight - bWeight;
        });
        
        // 如果提供了selectedSku，处理选中状态
        if (selectedSku && selectedSku.skuAttributeIds && Array.isArray(selectedSku.skuAttributeIds)) {
          // 创建选中属性ID的映射
          const selectedAttrMap:any = {};
          selectedSku.skuAttributeIds.forEach((attr:any) => {
            if (attr && attr.id && attr.valueId) {
              selectedAttrMap[attr.id] = `${attr.id}:${attr.valueId}`;
            }
          });
          
          // 标记选中的属性值
          result.forEach(spec => {
            spec.specAttrList.forEach((attrValue:any) => {
              if (selectedAttrMap[spec.nameId] === attrValue.id) {
                attrValue.active = true;
              }
            });
          });
        }
        
        return result;
      } catch (error) {
        console.error('product_sku_map2array helper error:', error);
        return [];
      }
    });
    // product_thirdparty_combine 助手函数 - 组合产品的第三方平台信息
    Handlebars.registerHelper("product_thirdparty_combine", function(spu, options) {
      try {
        // 检查输入参数
        if (!spu || typeof spu !== 'object') {
          return {
            thirdPathList: []
          };
        }
    
        // 初始化返回对象
        const result:any = {
          thirdPathList: []
        };
    
        // 检查是否有第三方平台数据
        if (!spu.thirdPartyPlatforms || typeof spu.thirdPartyPlatforms !== 'object') {
          return result;
        }
    
        // 处理第三方平台数据
        const thirdPartyPlatforms = spu.thirdPartyPlatforms;
        
        // 遍历所有第三方平台
        Object.keys(thirdPartyPlatforms).forEach(platformKey => {
          const platform = thirdPartyPlatforms[platformKey];
          
          // 检查平台数据是否有效
          if (!platform || typeof platform !== 'object') {
            return;
          }
    
          // 检查平台是否启用且有链接
          if (platform.enable && platform.link) {
            // 创建第三方平台对象
            const thirdPartyItem:any = {
              key: platformKey,
              link: platform.link,
              text: platform.text || `View on ${platformKey.charAt(0).toUpperCase() + platformKey.slice(1)}`,
              shopline_attributes: `data-third-party="${platformKey}"`
            };
    
            // 添加其他平台特定的属性
            if (platform.customAttributes && typeof platform.customAttributes === 'object') {
              Object.keys(platform.customAttributes).forEach(attrKey => {
                thirdPartyItem[attrKey] = platform.customAttributes[attrKey];
              });
            }
    
            // 添加到结果列表
            result.thirdPathList.push(thirdPartyItem);
          }
        });
        return result;
      } catch (error) {
        console.error('product_thirdparty_combine helper error:', error);
        return {
          thirdPathList: []
        };
      }
    });
    // product_thirdparty_share 助手函数
    Handlebars.registerHelper('product_thirdparty_share', function(id, shareData, shareSettings) {
      if (!shareData || !shareSettings) {
        return { defaultShowList: [], moreList: [] };
      }
    
      // 解构分享数据
      const {
        title = '',
        uri = {},
        image = '',
        description = '',
        storeInfo = {}
      } = shareData;
    
      // 解构分享设置
      const {
        facebook = true,
        twitter = true,
        pinterest = true,
        line = true,
        whatsapp = true,
        tumblr = true
      } = shareSettings;
    
      // 当前页面URL
      const currentUrl = typeof uri === 'string' ? uri : (uri.href || '');
      
      // 分享平台配置
      const platforms:any = {
        facebook: {
          name: 'Share',
          url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
          enabled: facebook
        },
        twitter: {
          name: 'Tweet',
          url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
          enabled: twitter
        },
        pinterest: {
          name: 'Pin it',
          url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}`,
          enabled: pinterest
        },
        line: {
          name: 'LINE',
          url: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`,
          enabled: line
        },
        whatsapp: {
          name: 'Whatsapp',
          url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + currentUrl)}`,
          enabled: whatsapp
        },
        tumblr: {
          name: 'Tumblr',
          url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}&caption=${encodeURIComponent(description)}`,
          enabled: tumblr
        }
      };
    
      // 根据启用状态筛选平台
      const enabledPlatforms = Object.keys(platforms).filter(key => platforms[key].enabled).map(key => ({
        name: platforms[key].name,
        url: platforms[key].url
      }));
    
      // 默认显示前4个平台，其余放入更多列表
      const defaultShowList = enabledPlatforms.slice(0, 4);
      const moreList = enabledPlatforms.slice(4);
    
      return {
        defaultShowList,
        moreList
      };
    });
    // trade_cart_sku_num_map 助手函数
    Handlebars.registerHelper('trade_cart_sku_num_map',function(activeItems) {
      // 创建一个空的映射对象
      const skuNumMap:any = {};
      // 遍历所有活动商品项
      if (activeItems && Array.isArray(activeItems)) {
        activeItems.forEach(item => {
          // 假设每个item都有sku_id和quantity属性
          // 根据实际数据结构调整键名
          if (item.sku_id || item.skuId) {
            const skuId = item.sku_id || item.skuId;
            const quantity = item.quantity || item.num || 1;
            skuNumMap[skuId] = quantity;
          }
        });
      }
      return skuNumMap;
    });
    // sales_promotion_reminder_translate 助手函数
    Handlebars.registerHelper('sales_promotion_reminder_translate', function(promotion, options) {
      try {
        // 检查输入参数
        if (!promotion || typeof promotion !== 'object') {
          return {};
        }
    
        // 获取配置选项
        const config = options.hash || {};
        const lineBreak = config.lineBreak || 0;
    
        // 初始化返回对象
        const result = {
          show: false,
          text: '',
          type: '',
          promotionId: promotion.id || '',
          promotionName: promotion.name || ''
        };
    
        // 检查是否有促销信息需要显示
        if (!promotion.benefitType && !promotion.promotionType) {
          return result;
        }
    
        // 根据促销类型处理不同的提醒文本
        const benefitType = promotion.benefitType || promotion.promotionType;
        const promotionName = promotion.name || '';
        
        // 设置促销类型
        result.type = benefitType;
        result.promotionId = promotion.id || '';
        result.promotionName = promotionName;
    
        // 根据不同类型生成提醒文本
        switch (benefitType) {
          case 1: // 满减
          case 'FULL_DISCOUNT':
            result.text = `满减优惠: ${promotionName}`;
            result.show = true;
            break;
            
          case 2: // 折扣
          case 'DISCOUNT':
            result.text = `折扣优惠: ${promotionName}`;
            result.show = true;
            break;
            
          case 3: // 特价
          case 'SPECIAL_PRICE':
            result.text = `特价优惠: ${promotionName}`;
            result.show = true;
            break;
            
          case 4: // 包邮
          case 'FREE_SHIPPING':
            result.text = `包邮优惠: ${promotionName}`;
            result.show = true;
            break;
            
          case 5: // 买赠
          case 'BUY_GIFT':
            result.text = `买赠活动: ${promotionName}`;
            result.show = true;
            break;
            
          case 6: // 第X件X折
          case 'NTH_DISCOUNT':
            result.text = `第X件折扣: ${promotionName}`;
            result.show = true;
            break;
            
          case 7: // 满赠
          case 'FULL_GIFT':
            result.text = `满赠活动: ${promotionName}`;
            result.show = true;
            break;
            
          default:
            result.text = promotionName;
            result.show = !!promotionName;
        }
    
        // 如果需要换行处理
        if (lineBreak && result.text) {
          // 根据lineBreak值处理换行
          if (lineBreak === 1) {
            // 使用<br>标签换行
            result.text = result.text.replace(/: /g, ':<br>');
          } else if (lineBreak === 2) {
            // 使用\n换行
            result.text = result.text.replace(/: /g, ':\n');
          }
        }
    
        // 处理促销的额外信息
        if (promotion.saleExtInfo) {
          try {
            const extInfo = typeof promotion.saleExtInfo === 'string' 
              ? JSON.parse(promotion.saleExtInfo) 
              : promotion.saleExtInfo;
              
            if (extInfo && typeof extInfo === 'object') {
              // 合并扩展信息到结果中
              Object.assign(result, extInfo);
            }
          } catch (e) {
            // 解析失败时不处理
            console.warn('Failed to parse saleExtInfo:', e);
          }
        }
    
        return result;
      } catch (error) {
        console.error('sales_promotion_reminder_translate helper error:', error);
        return {
          show: false,
          text: '',
          type: ''
        };
      }
    });
    // trade_cart_show_remove 助手函数
    Handlebars.registerHelper('trade_cart_show_remove', function(data, skuNumMap, options) {
      try {
        // 检查输入参数
        if (!data || typeof data !== 'object') {
          return false;
        }
        // 默认返回值
        let shouldShowRemove = true;
        // 检查商品是否为特殊业务类型
        if (data.businessFlag) {
          // 如果 singleDelete 为 false，则不显示删除按钮
          if (data.businessFlag.singleDelete === false) {
            shouldShowRemove = false;
          }
          
          // 如果是不可调整数量的商品，可能也不显示删除按钮
          if (data.businessFlag.singleAdjustNum === false) {
            shouldShowRemove = false;
          }
        }
        // 检查商品库存状态
        if (data.maxPurchaseTotalNum !== undefined && data.maxPurchaseTotalNum <= 0) {
          // 如果商品已售罄且原因代码为库存不足，可能不显示删除按钮
          if (data.maxPurchaseReasonCode === 'STOCK_OVER') {
            shouldShowRemove = false;
          }
        }
        // 检查 SKU 数量映射
        if (skuNumMap && typeof skuNumMap === 'object') {
          const skuId = data.skuId || data.skuSeq;
          if (skuId && skuNumMap.hasOwnProperty(skuId)) {
            const skuNum = skuNumMap[skuId];
            // 如果数量为0或其他特殊状态，可能影响删除按钮的显示
            if (skuNum <= 0) {
              shouldShowRemove = false;
            }
          }
        }
        // 检查商品是否处于非活动状态
        if (data.inactive === true) {
          shouldShowRemove = false;
        }
        // 检查是否有错误列表且错误类型特殊
        if (data.errorList && Array.isArray(data.errorList) && data.errorList.length > 0) {
          // 某些错误状态下可能不显示删除按钮
          const criticalErrors = ['0105']; // 示例错误代码
          if (data.errorList.some((error:any) => criticalErrors.includes(error))) {
            shouldShowRemove = false;
          }
        }
        // 检查商品来源
        if (data.productSource !== undefined) {
          // 某些特殊来源的商品可能不允许删除
          const restrictedSources = [2, 3]; // 示例限制来源
          if (restrictedSources.includes(data.productSource)) {
            shouldShowRemove = false;
          }
        }
        return shouldShowRemove;
      } catch (error) {
        console.error('trade_cart_show_remove helper error:', error);
        // 出错时默认显示删除按钮
        return true;
      }
    });
    // trade_coupon_formatData 助手函数 - 格式化购物车优惠券相关数据
    Handlebars.registerHelper('trade_coupon_formatData', function(this:any,cartType, options) {
      try {
        // 初始化促销代码列表
        let promotionCodesList = [];
        
        // 根据购物车类型和当前上下文获取促销代码数据
        if (this.cartInfo && this.cartInfo.promotionCodes) {
          // 处理促销代码数据
          promotionCodesList = this.cartInfo.promotionCodes.map((code:any) => {
            return {
              promotionCode: code.code || code.promotionCode || '',
              valid: code.valid !== undefined ? code.valid : true,
              message: code.message || '',
              discountAmount: code.discountAmount || 0,
              ...code // 保留其他原始属性
            };
          });
        }
        
        // 如果直接传入了促销代码列表，则使用它
        if (this.promotionCodesList) {
          promotionCodesList = this.promotionCodesList;
        }
        
        // 创建传递给模板的上下文数据
        const context = {
          // 保持原有上下文数据
          ...this,
          // 购物车类型
          cartType: cartType || 'cart',
          // 促销代码列表
          promotionCodesList: promotionCodesList,
          // 是否有有效的促销代码
          hasValidCodes: promotionCodesList.some((code:any) => code.valid),
          // 是否有无效的促销代码
          hasInvalidCodes: promotionCodesList.some((code:any) => !code.valid),
          // 有效的促销代码列表
          validPromotionCodes: promotionCodesList.filter((code:any) => code.valid),
          // 无效的促销代码列表
          invalidPromotionCodes: promotionCodesList.filter((code:any) => !code.valid)
        };
        // 执行块内容并返回结果
        if (options && typeof options.fn === 'function') {
          return options.fn(context);
        }
        // 如果不是块级调用，返回上下文数据
        return context;
      } catch (error) {
        console.error('trade_coupon_formatData helper error:', error);
        // 出错时返回默认上下文
        const defaultContext = {
          cartType: cartType || 'cart',
          promotionCodesList: [],
          hasValidCodes: false,
          hasInvalidCodes: false,
          validPromotionCodes: [],
          invalidPromotionCodes: [],
          ...this
        };
        if (options && typeof options.fn === 'function') {
          return options.fn(defaultContext);
        }
        return defaultContext;
      }
    });
    // urlParse 助手函数 - 解析URL并返回其组成部分
    Handlebars.registerHelper('urlParse', function(this:any,url, options) {
      try {
        // 检查 url 参数
        if (!url || typeof url !== 'string') {
          // 如果是块级调用，执行块内容
          if (options && typeof options.fn === 'function') {
            return options.fn(this);
          }
          return null;
        }
    
        // 解析URL
        const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.href : 'http://localhost');
        
        // 构建返回对象
        const parsedUrl:any = {
          protocol: urlObj.protocol,
          hostname: urlObj.hostname,
          port: urlObj.port,
          pathname: urlObj.pathname,
          search: urlObj.search,
          hash: urlObj.hash,
          href: urlObj.href,
          query: Object.fromEntries(urlObj.searchParams),
          // 兼容Shopline/Shopify格式
          host: urlObj.host,
          path: urlObj.pathname + urlObj.search
        };
    
        // 如果是块级调用，将解析结果添加到上下文并执行块内容
        if (options && typeof options.fn === 'function') {
          // 合并解析结果到当前上下文
          const contextWithUrlData = Object.assign({}, this, parsedUrl);
          return options.fn(contextWithUrlData);
        }
        
        // 子表达式调用或者直接调用，返回解析结果
        if (options && options.hash) {
          // 如果指定了特定属性，返回该属性的值
          const property = options.hash.property;
          if (property && parsedUrl.hasOwnProperty(property)) {
            return parsedUrl[property];
          }
        }
        
        // 默认返回整个解析对象
        return parsedUrl;
      } catch (error) {
        console.error('urlParse helper error:', error);
        
        // 出错时返回空对象或执行块内容
        if (options && typeof options.fn === 'function') {
          return options.fn(this);
        }
        return {};
      }
    });
    Handlebars.registerHelper('formItem', function(this:any,name, additionalAttrs, options) {
      // 确保 options 存在
      if (!options && typeof additionalAttrs === 'object') {
        options = additionalAttrs;
        additionalAttrs = '';
      }
      // 如果没有提供 options，则直接返回空字符串
      if (!options) {
        return '';
      }
      // 提取块级内容
      const content = options.fn ? options.fn(this) : '';
      // 处理额外属性
      let attrs = '';
      if (additionalAttrs && typeof additionalAttrs === 'string') {
        attrs = additionalAttrs.trim();
        if (attrs) {
          attrs = ' ' + attrs;
        }
      }
      // 生成表单项包装结构
      return new Handlebars.SafeString(`<div sl-form-item-name="${name}" ${attrs}>${content}</div>`);
    });
    // url_decode 助手函数 - 解码URL
    Handlebars.registerHelper('url_decode', function(url) {
      if (!url) return '';
      try {
        return decodeURIComponent(url);
      } catch (e) {
        // 如果解码失败，返回原始字符串
        return url;
      }
    });

}

