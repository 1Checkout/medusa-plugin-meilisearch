"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeFieldConfig = normalizeFieldConfig;
exports.getTranslation = getTranslation;
/**
 * Helper to normalize field configuration
 */
function normalizeFieldConfig(field) {
    if (typeof field === 'string') {
        return { source: field };
    }
    return field;
}
/**
 * Helper to get a translation for a field
 */
function getTranslation(translations, language, fallbackLanguage = 'en') {
    if (!translations?.length) {
        return undefined;
    }
    // Try to find translation in requested language
    if (language) {
        const translation = translations.find((t) => t.language_code === language);
        if (translation) {
            return translation.value;
        }
    }
    // Fall back to the default language
    const fallback = translations.find((t) => t.language_code === fallbackLanguage);
    if (fallback) {
        return fallback.value;
    }
    // Last resort - return first translation
    return translations[0].value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9tZWlsaXNlYXJjaC90eXBlcy90cmFuc2xhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1FQSxvREFLQztBQUtELHdDQXlCQztBQXRDRDs7R0FFRztBQUNILFNBQWdCLG9CQUFvQixDQUFDLEtBQWlDO0lBQ3BFLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUE7QUFDZCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixjQUFjLENBQzVCLFlBQTJCLEVBQzNCLFFBQWlCLEVBQ2pCLGdCQUFnQixHQUFHLElBQUk7SUFFdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMxQixPQUFPLFNBQVMsQ0FBQTtJQUNsQixDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELElBQUksUUFBUSxFQUFFLENBQUM7UUFDYixNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQzFFLElBQUksV0FBVyxFQUFFLENBQUM7WUFDaEIsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFBO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQW9DO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssZ0JBQWdCLENBQUMsQ0FBQTtJQUMvRSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2IsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO0FBQzlCLENBQUMifQ==