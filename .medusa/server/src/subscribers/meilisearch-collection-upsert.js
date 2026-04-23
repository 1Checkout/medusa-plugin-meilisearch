"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCollectionUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_collection_1 = require("../workflows/upsert-collection");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchCollectionUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_collection_1.upsertCollectionWorkflow)(container).run({
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
        'product-collection.created',
        'product-collection.updated',
        'product-collection.attached',
        'product-collection.detached',
        // Module events
        utils_1.ProductEvents.PRODUCT_COLLECTION_CREATED,
        utils_1.ProductEvents.PRODUCT_COLLECTION_UPDATED,
        utils_1.ProductEvents.PRODUCT_COLLECTION_ATTACHED,
        utils_1.ProductEvents.PRODUCT_COLLECTION_DETACHED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY29sbGVjdGlvbi11cHNlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtY29sbGVjdGlvbi11cHNlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EscURBZ0JDO0FBcEJELDJDQUErQztBQUMvQyxzRUFBeUU7QUFDekUsZ0VBQXFGO0FBRXRFLEtBQUssVUFBVSxrQ0FBa0MsQ0FBQyxFQUMvRCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLElBQUksQ0FBQyxJQUFBLHdDQUFxQixFQUFDLFNBQVMsRUFBRSxxQ0FBa0IsQ0FBQztRQUFFLE9BQU07SUFFakUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsNENBQXdCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzVDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQiw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQzVCLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsMEJBQTBCO1FBQ3hDLHFCQUFhLENBQUMsMEJBQTBCO1FBQ3hDLHFCQUFhLENBQUMsMkJBQTJCO1FBQ3pDLHFCQUFhLENBQUMsMkJBQTJCO0tBQzFDO0NBQ0YsQ0FBQSJ9