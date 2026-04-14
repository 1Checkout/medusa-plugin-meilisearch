"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchVariantUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_variant_1 = require("../workflows/upsert-variant");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchVariantUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_variant_1.upsertVariantWorkflow)(container).run({
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
        'product-variant.created',
        'product-variant.updated',
        // Module events
        utils_1.ProductEvents.PRODUCT_VARIANT_CREATED,
        utils_1.ProductEvents.PRODUCT_VARIANT_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdmFyaWFudC11cHNlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtdmFyaWFudC11cHNlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0Esa0RBZ0JDO0FBcEJELDJDQUErQztBQUMvQyxnRUFBbUU7QUFDbkUsZ0VBQXFGO0FBRXRFLEtBQUssVUFBVSwrQkFBK0IsQ0FBQyxFQUM1RCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLElBQUksQ0FBQyxJQUFBLHdDQUFxQixFQUFDLFNBQVMsRUFBRSxxQ0FBa0IsQ0FBQztRQUFFLE9BQU07SUFFakUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsc0NBQXFCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3pDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLHVCQUF1QjtRQUNyQyxxQkFBYSxDQUFDLHVCQUF1QjtLQUN0QztDQUNGLENBQUEifQ==