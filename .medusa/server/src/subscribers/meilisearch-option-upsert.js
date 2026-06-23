"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_option_1 = require("../workflows/upsert-option");
async function meilisearchOptionUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_option_1.upsertOptionWorkflow)(container).run({
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
        // Creation indexing disabled (see meilisearch-product-upsert): options are
        // created in bulk with their product, so creation indexing is handled by the
        // post-import batched sync. Only UPDATE events index live.
        // Workflow events
        // 'product-option.created',
        'product-option.updated',
        // Module events
        // ProductEvents.PRODUCT_OPTION_CREATED,
        utils_1.ProductEvents.PRODUCT_OPTION_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLGlEQWNDO0FBakJELDJDQUErQztBQUMvQyw4REFBaUU7QUFFbEQsS0FBSyxVQUFVLDhCQUE4QixDQUFDLEVBQzNELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsb0NBQW9CLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3hDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLDJFQUEyRTtRQUMzRSw2RUFBNkU7UUFDN0UsMkRBQTJEO1FBQzNELGtCQUFrQjtRQUNsQiw0QkFBNEI7UUFDNUIsd0JBQXdCO1FBQ3hCLGdCQUFnQjtRQUNoQix3Q0FBd0M7UUFDeEMscUJBQWEsQ0FBQyxzQkFBc0I7S0FDckM7Q0FDRixDQUFBIn0=