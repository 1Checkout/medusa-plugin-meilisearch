"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCategory = exports.transformProduct = void 0;
const types_1 = require("../types");
const transformProduct = (product, options) => {
    const { i18n, language, fallbackLanguage, includeAllTranslations, translatableFields: customTranslatableFields, translations = {}, } = options || {};
    if (!i18n) {
        return { ...product };
    }
    const defaultLang = i18n.defaultLanguage;
    const currentLang = language || defaultLang;
    // Determine translatable fields
    let translatableFields = (customTranslatableFields || i18n.translatableFields || []).map(types_1.normalizeFieldConfig);
    if (i18n.strategy === 'field-suffix') {
        const result = { ...product };
        // If no fields specified and using field-suffix strategy,
        // auto-detect string fields as translatable
        if (!translatableFields.length) {
            translatableFields = Object.entries(product)
                .filter(([, value]) => typeof value === 'string')
                .map(([key]) => ({ source: key }));
        }
        // For each translatable field, create language-specific fields
        translatableFields.forEach((fieldConfig) => {
            const sourceField = fieldConfig.source;
            const targetField = fieldConfig.target || sourceField;
            // Get translations for this field
            const fieldTranslations = translations[sourceField] || [];
            if (includeAllTranslations) {
                // Include all translations with language suffixes
                fieldTranslations.forEach((translation) => {
                    result[`${targetField}_${translation.language_code}`] = translation.value;
                });
            }
            else {
                // Only include current language translation
                const translatedValue = (0, types_1.getTranslation)(fieldTranslations, currentLang, fallbackLanguage || defaultLang);
                if (translatedValue) {
                    result[`${targetField}_${currentLang}`] = translatedValue;
                    // Keep the default language value in the original field
                    if (currentLang === defaultLang) {
                        result[targetField] = translatedValue;
                    }
                }
            }
        });
        return result;
    }
    // For separate-index strategy, return the product with translations for current language
    const result = { ...product };
    translatableFields.forEach((fieldConfig) => {
        const sourceField = fieldConfig.source;
        const targetField = fieldConfig.target || sourceField;
        const fieldTranslations = translations[targetField] || [];
        const translatedValue = (0, types_1.getTranslation)(fieldTranslations, currentLang, fallbackLanguage || defaultLang);
        if (translatedValue) {
            result[targetField] = translatedValue;
        }
    });
    return result;
};
exports.transformProduct = transformProduct;
const transformCategory = (category, options) => {
    const { i18n, language, fallbackLanguage, includeAllTranslations, translatableFields: customTranslatableFields, translations = {}, } = options || {};
    if (!i18n) {
        return { ...category };
    }
    const defaultLang = i18n.defaultLanguage;
    const currentLang = language || defaultLang;
    // Determine translatable fields
    let translatableFields = (customTranslatableFields || i18n.translatableFields || []).map(types_1.normalizeFieldConfig);
    if (i18n.strategy === 'field-suffix') {
        const result = { ...category };
        // If no fields specified and using field-suffix strategy,
        // auto-detect string fields as translatable
        if (!translatableFields.length) {
            translatableFields = Object.entries(category)
                .filter(([, value]) => typeof value === 'string')
                .map(([key]) => ({ source: key }));
        }
        // For each translatable field, create language-specific fields
        translatableFields.forEach((fieldConfig) => {
            const sourceField = fieldConfig.source;
            const targetField = fieldConfig.target || sourceField;
            // Get translations for this field
            const fieldTranslations = translations[sourceField] || [];
            if (includeAllTranslations) {
                // Include all translations with language suffixes
                fieldTranslations.forEach((translation) => {
                    result[`${targetField}_${translation.language_code}`] = translation.value;
                });
            }
            else {
                // Only include current language translation
                const translatedValue = (0, types_1.getTranslation)(fieldTranslations, currentLang, fallbackLanguage || defaultLang);
                if (translatedValue) {
                    result[`${targetField}_${currentLang}`] = translatedValue;
                    // Keep the default language value in the original field
                    if (currentLang === defaultLang) {
                        result[targetField] = translatedValue;
                    }
                }
            }
        });
        return result;
    }
    // For separate-index strategy, return the category with translations for current language
    const result = { ...category };
    translatableFields.forEach((fieldConfig) => {
        const sourceField = fieldConfig.source;
        const targetField = fieldConfig.target || sourceField;
        const fieldTranslations = translations[targetField] || [];
        const translatedValue = (0, types_1.getTranslation)(fieldTranslations, currentLang, fallbackLanguage || defaultLang);
        if (translatedValue) {
            result[targetField] = translatedValue;
        }
    });
    return result;
};
exports.transformCategory = transformCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tZWlsaXNlYXJjaC91dGlscy90cmFuc2Zvcm1lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxvQ0FRaUI7QUFPVixNQUFNLGdCQUFnQixHQUE4QixDQUFDLE9BQW1CLEVBQUUsT0FBMEIsRUFBRSxFQUFFO0lBQzdHLE1BQU0sRUFDSixJQUFJLEVBQ0osUUFBUSxFQUNSLGdCQUFnQixFQUNoQixzQkFBc0IsRUFDdEIsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQzVDLFlBQVksR0FBRyxFQUFFLEdBQ2xCLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUVqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQTtJQUN2QixDQUFDO0lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQTtJQUN4QyxNQUFNLFdBQVcsR0FBRyxRQUFRLElBQUksV0FBVyxDQUFBO0lBRTNDLGdDQUFnQztJQUNoQyxJQUFJLGtCQUFrQixHQUFHLENBQUMsd0JBQXdCLElBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyw0QkFBb0IsQ0FBQyxDQUFBO0lBRTlHLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxjQUFjLEVBQUUsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBd0IsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFBO1FBRWxELDBEQUEwRDtRQUMxRCw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9CLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUN6QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLE9B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