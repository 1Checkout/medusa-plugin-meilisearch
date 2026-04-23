"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCollectionDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_collection_1 = require("../workflows/delete-collection");
async function meilisearchCollectionDeleteHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, delete_collection_1.deleteCollectionWorkflow)(container).run({
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
        'product-collection.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_COLLECTION_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY29sbGVjdGlvbi1kZWxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtY29sbGVjdGlvbi1kZWxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEscURBY0M7QUFqQkQsMkNBQStDO0FBQy9DLHNFQUF5RTtBQUUxRCxLQUFLLFVBQVUsa0NBQWtDLENBQUMsRUFDL0QsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSw0Q0FBd0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDNUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLDRCQUE0QjtRQUM1QixnQkFBZ0I7UUFDaEIscUJBQWEsQ0FBQywwQkFBMEI7S0FDekM7Q0FDRixDQUFBIn0=