"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTagUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_tag_1 = require("../workflows/upsert-tag");
async function meilisearchTagUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_tag_1.upsertTagWorkflow)(container).run({
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
        'product-tag.created',
        'product-tag.updated',
        'product-tag.attached',
        'product-tag.detached',
        // Module events
        utils_1.ProductEvents.PRODUCT_TAG_CREATED,
        utils_1.ProductEvents.PRODUCT_TAG_UPDATED,
        utils_1.ProductEvents.PRODUCT_TAG_ATTACHED,
        utils_1.ProductEvents.PRODUCT_TAG_DETACHED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdGFnLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC10YWctdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDhDQWNDO0FBakJELDJDQUErQztBQUMvQyx3REFBMkQ7QUFFNUMsS0FBSyxVQUFVLDJCQUEyQixDQUFDLEVBQ3hELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsOEJBQWlCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3JDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsbUJBQW1CO1FBQ2pDLHFCQUFhLENBQUMsbUJBQW1CO1FBQ2pDLHFCQUFhLENBQUMsb0JBQW9CO1FBQ2xDLHFCQUFhLENBQUMsb0JBQW9CO0tBQ25DO0NBQ0YsQ0FBQSJ9