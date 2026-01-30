/**
 * Represents a translation for a translatable field
 */
export interface Translation {
    /**
     * The language code (e.g. 'en', 'fr')
     */
    language_code: string;
    /**
     * The translated value
     */
    value: string;
}
/**
 * Represents translations for a field
 */
export interface TranslationMap {
    [field: string]: Translation[];
}
/**
 * Configuration for a translatable field
 */
export interface TranslatableField {
    /**
     * The field name in the source object
     */
    source: string;
    /**
     * Optional target field name in the translated object
     * If not provided, uses the source name
     */
    target?: string;
}
/**
 * Options for transforming translations
 */
export interface TranslationOptions {
    /**
     * The language to prioritize
     */
    language?: string;
    /**
     * The fallback language if translation not found
     */
    fallbackLanguage?: string;
    /**
     * Whether to include all translations in the output
     */
    includeAllTranslations?: boolean;
    /**
     * Configuration for translatable fields
     * Can be either an array of field names or field configurations
     */
    translatableFields?: (string | TranslatableField)[];
}
/**
 * Helper to normalize field configuration
 */
export declare function normalizeFieldConfig(field: string | TranslatableField): TranslatableField;
/**
 * Helper to get a translation for a field
 */
export declare function getTranslation(translations: Translation[], language?: string, fallbackLanguage?: string): string | undefined;
//# sourceMappingURL=translation.d.ts.map