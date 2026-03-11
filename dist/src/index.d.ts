import { HbsTemplateEngine } from './lib/template-engine';
import { generateTemplateFromJson } from './lib/generateTemplateFromJson';
import { getSection } from './lib/section';
declare const _default: {
    myHbs: {
        getSection: typeof getSection;
        HbsTemplateEngine: typeof HbsTemplateEngine;
        render: (templateName: string, context?: any) => Promise<string>;
        renderString: (templateString: string, context?: any) => Promise<string>;
        renderFile: (filePath: string, context?: any) => Promise<string>;
        createSafeString: (string: string) => Handlebars.SafeString;
        compile: (templateString: string) => HandlebarsTemplateDelegate<any>;
        i18nManager: {
            I18nData: any;
            loadTranslations(requestData: any, fileConfig: any): Promise<void>;
        };
        getFileContent: (name: string, fileConfig: import("./lib/fileManager/fileContent").fileConfig) => string;
        generateTemplateFromJson: typeof generateTemplateFromJson;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map