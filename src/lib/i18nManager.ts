// src/app/lib/i18nManager.js
import { getFileContent } from './fileManager/fileContent';

class I18nManager {

    // 语言缓存
    I18nData: any;
    constructor() {
        this.I18nData = {}; // 语言缓存 { locale -> translations }
    }
    // 加载语言文件
    async loadTranslations(requestData:any,fileConfig:any) {
        try {
            const fileContent = await getFileContent(`locales/${requestData.language}.json`,fileConfig);
            this.I18nData = JSON.parse(fileContent);
        }catch (error) {
            console.error(`Error loading translations for ${requestData.language}:`, error);
        }
    }
}

// 创建单例
const i18nManager = new I18nManager();

export default i18nManager;