import { Handlebars } from './helper';
type HelperDelegate = (context?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, options?: HelperOptions) => any;
interface HbsTemplateEngineOptions {
    viewsDir?: string;
    partialsDir?: string;
    helpers?: Record<string, HelperDelegate>;
    fileContentProvider?: (fileName: string, config?: any) => string | Promise<string>;
}
interface HelperOptions {
    fn: Function;
    inverse: Function;
}
declare class HbsTemplateEngine {
    private handlebars;
    private viewsDir;
    private partialsDir;
    private helpers;
    constructor(options?: HbsTemplateEngineOptions);
    registerHelpers(): void;
    registerPartials(): Promise<void>;
    render(templateName: string, context?: any): Promise<string>;
    renderString(templateString: string, context?: any): Promise<string>;
    renderFile(filePath: string, context?: any): Promise<string>;
    createSafeString(string: string): Handlebars.SafeString;
    compile(templateString: string): HandlebarsTemplateDelegate<any>;
}
export { HbsTemplateEngine };
//# sourceMappingURL=template-engine.d.ts.map