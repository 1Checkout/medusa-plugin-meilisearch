"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCategoryDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_category_1 = require("../workflows/delete-category");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchCategoryDeleteHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.CATEGORY_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, delete_category_1.deleteCategoryWorkflow)(container).run({
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
        'product-category.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_CATEGORY_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY2F0ZWdvcnktZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLWNhdGVnb3J5LWRlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxtREFnQkM7QUFwQkQsMkNBQStDO0FBQy9DLGtFQUFxRTtBQUNyRSxnRUFBc0Y7QUFFdkUsS0FBSyxVQUFVLGdDQUFnQyxDQUFDLEVBQzdELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsSUFBSSxDQUFDLElBQUEsd0NBQXFCLEVBQUMsU0FBUyxFQUFFLHNDQUFtQixDQUFDO1FBQUUsT0FBTTtJQUVsRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSx3Q0FBc0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDMUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLDBCQUEwQjtRQUMxQixnQkFBZ0I7UUFDaEIscUJBQWEsQ0FBQyx3QkFBd0I7S0FDdkM7Q0FDRixDQUFBIn0=