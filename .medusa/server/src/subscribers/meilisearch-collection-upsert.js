"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCollectionUpsertHandler;
const upsert_collection_1 = require("../workflows/upsert-collection");
async function meilisearchCollectionUpsertHandler({ container, event: { data }, }) {
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
    // 'product-collection.created',
    // 'product-collection.updated',
    // 'product-collection.attached',
    // 'product-collection.detached',
    // Module events
    // ProductEvents.PRODUCT_COLLECTION_CREATED,
    // ProductEvents.PRODUCT_COLLECTION_UPDATED,
    // ProductEvents.PRODUCT_COLLECTION_ATTACHED,
    // ProductEvents.PRODUCT_COLLECTION_DETACHED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY29sbGVjdGlvbi11cHNlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtY29sbGVjdGlvbi11cHNlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEscURBY0M7QUFoQkQsc0VBQXlFO0FBRTFELEtBQUssVUFBVSxrQ0FBa0MsQ0FBQyxFQUMvRCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLDRDQUF3QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM1QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7SUFDTCxrQkFBa0I7SUFDbEIsZ0NBQWdDO0lBQ2hDLGdDQUFnQztJQUNoQyxpQ0FBaUM7SUFDakMsaUNBQWlDO0lBQ2pDLGdCQUFnQjtJQUNoQiw0Q0FBNEM7SUFDNUMsNENBQTRDO0lBQzVDLDZDQUE2QztJQUM3Qyw2Q0FBNkM7S0FDOUM7Q0FDRixDQUFBIn0=