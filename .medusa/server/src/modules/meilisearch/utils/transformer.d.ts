import { DefaultProductTransformer, DefaultCategoryTransformer, I18nConfig, TranslationMap, TranslationOptions } from '../types';
export interface TransformOptions extends TranslationOptions {
    i18n?: I18nConfig;
    translations?: TranslationMap;
}
export declare const transformProduct: DefaultProductTransformer;
export declare const transformCategory: DefaultCategoryTransformer;
//# sourceMappingURL=transformer.d.ts.map