"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionValueUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_option_value_1 = require("../workflows/upsert-option-value");
async function meilisearchOptionValueUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_option_value_1.upsertOptionValueWorkflow)(container).run({
            input: { id: data.id },
        });
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}
exports.config = {
    event: [
        // Creation indexing disabled (see meilisearch-product-upsert): option values
        // are created in bulk with their product, so creation indexing is handled by
        // the post-import batched sync. Only UPDATE events index live.
        // Workflow events
        // 'product-option-value.created',
        'product-option-value.updated',
        // Module events
        // ProductEvents.PRODUCT_OPTION_VALUE_CREATED,
        utils_1.ProductEvents.PRODUCT_OPTION_VALUE_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXZhbHVlLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdmFsdWUtdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHNEQWNDO0FBakJELDJDQUErQztBQUMvQywwRUFBNEU7QUFFN0QsS0FBSyxVQUFVLG1DQUFtQyxDQUFDLEVBQ2hFLFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsK0NBQXlCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzdDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLDZFQUE2RTtRQUM3RSw2RUFBNkU7UUFDN0UsK0RBQStEO1FBQy9ELGtCQUFrQjtRQUNsQixrQ0FBa0M7UUFDbEMsOEJBQThCO1FBQzlCLGdCQUFnQjtRQUNoQiw4Q0FBOEM7UUFDOUMscUJBQWEsQ0FBQyw0QkFBNEI7S0FDM0M7Q0FDRixDQUFBIn0=