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
        // Workflow events
        'product-option.created',
        'product-option.updated',
        // Module events
        utils_1.ProductEvents.PRODUCT_OPTION_CREATED,
        utils_1.ProductEvents.PRODUCT_OPTION_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLGlEQWNDO0FBakJELDJDQUErQztBQUMvQyw4REFBaUU7QUFFbEQsS0FBSyxVQUFVLDhCQUE4QixDQUFDLEVBQzNELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsb0NBQW9CLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3hDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLHNCQUFzQjtRQUNwQyxxQkFBYSxDQUFDLHNCQUFzQjtLQUNyQztDQUNGLENBQUEifQ==