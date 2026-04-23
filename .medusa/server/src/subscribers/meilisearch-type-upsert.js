"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTypeUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_type_1 = require("../workflows/upsert-type");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchTypeUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_type_1.upsertTypeWorkflow)(container).run({
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
        // Workflow evets
        'product-type.created',
        'product-type.updated',
        'product-type.attached',
        'product-type.detached',
        // Module events
        utils_1.ProductEvents.PRODUCT_TYPE_CREATED,
        utils_1.ProductEvents.PRODUCT_TYPE_UPDATED,
        utils_1.ProductEvents.PRODUCT_TYPE_ATTACHED,
        utils_1.ProductEvents.PRODUCT_TYPE_DETACHED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdHlwZS11cHNlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtdHlwZS11cHNlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsK0NBZ0JDO0FBcEJELDJDQUErQztBQUMvQywwREFBNkQ7QUFDN0QsZ0VBQXFGO0FBRXRFLEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxFQUN6RCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLElBQUksQ0FBQyxJQUFBLHdDQUFxQixFQUFDLFNBQVMsRUFBRSxxQ0FBa0IsQ0FBQztRQUFFLE9BQU07SUFFakUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsZ0NBQWtCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3RDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsc0JBQXNCO1FBQ3RCLHVCQUF1QjtRQUN2Qix1QkFBdUI7UUFDdkIsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsb0JBQW9CO1FBQ2xDLHFCQUFhLENBQUMsb0JBQW9CO1FBQ2xDLHFCQUFhLENBQUMscUJBQXFCO1FBQ25DLHFCQUFhLENBQUMscUJBQXFCO0tBQ3BDO0NBQ0YsQ0FBQSJ9