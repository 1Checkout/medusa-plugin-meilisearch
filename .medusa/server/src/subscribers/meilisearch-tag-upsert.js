"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTagUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_tag_1 = require("../workflows/upsert-tag");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchTagUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdGFnLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC10YWctdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLDhDQWdCQztBQXBCRCwyQ0FBK0M7QUFDL0Msd0RBQTJEO0FBQzNELGdFQUFxRjtBQUV0RSxLQUFLLFVBQVUsMkJBQTJCLENBQUMsRUFDeEQsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSx3Q0FBcUIsRUFBQyxTQUFTLEVBQUUscUNBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLDhCQUFpQixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNyQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLG1CQUFtQjtRQUNqQyxxQkFBYSxDQUFDLG1CQUFtQjtRQUNqQyxxQkFBYSxDQUFDLG9CQUFvQjtRQUNsQyxxQkFBYSxDQUFDLG9CQUFvQjtLQUNuQztDQUNGLENBQUEifQ==