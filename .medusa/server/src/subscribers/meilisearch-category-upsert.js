"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCategoryUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_category_1 = require("../workflows/upsert-category");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchCategoryUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.CATEGORY_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_category_1.upsertCategoryWorkflow)(container).run({
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
        'product-category.created',
        'product-category.updated',
        // Module events
        utils_1.ProductEvents.PRODUCT_CATEGORY_CREATED,
        utils_1.ProductEvents.PRODUCT_CATEGORY_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY2F0ZWdvcnktdXBzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLWNhdGVnb3J5LXVwc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtREFnQkM7QUFwQkQsMkNBQStDO0FBQy9DLGtFQUFxRTtBQUNyRSxnRUFBc0Y7QUFFdkUsS0FBSyxVQUFVLGdDQUFnQyxDQUFDLEVBQzdELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsSUFBSSxDQUFDLElBQUEsd0NBQXFCLEVBQUMsU0FBUyxFQUFFLHNDQUFtQixDQUFDO1FBQUUsT0FBTTtJQUVsRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSx3Q0FBc0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDMUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsd0JBQXdCO1FBQ3RDLHFCQUFhLENBQUMsd0JBQXdCO0tBQ3ZDO0NBQ0YsQ0FBQSJ9