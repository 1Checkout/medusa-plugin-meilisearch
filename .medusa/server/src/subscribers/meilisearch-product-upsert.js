"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchProductUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_product_1 = require("../workflows/upsert-product");
async function meilisearchProductUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_product_1.upsertProductWorkflow)(container).run({
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
        // Creation indexing disabled: bulk imports create products and would emit
        // one indexing task per product (flooding Meili + the event bus). New
        // products are indexed by the post-import batched sync instead. Only UPDATE
        // events index live (e.g. price change, out-of-stock). Re-enable the
        // commented lines below to restore per-product creation indexing.
        // Workflow events
        // 'product.created',
        'product.updated',
        // Module events
        // ProductEvents.PRODUCT_CREATED,
        utils_1.ProductEvents.PRODUCT_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJvZHVjdC11cHNlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtcHJvZHVjdC11cHNlcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsa0RBY0M7QUFqQkQsMkNBQStDO0FBQy9DLGdFQUFtRTtBQUVwRCxLQUFLLFVBQVUsK0JBQStCLENBQUMsRUFDNUQsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSxzQ0FBcUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDekMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsMEVBQTBFO1FBQzFFLHNFQUFzRTtRQUN0RSw0RUFBNEU7UUFDNUUscUVBQXFFO1FBQ3JFLGtFQUFrRTtRQUNsRSxrQkFBa0I7UUFDbEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsaUNBQWlDO1FBQ2pDLHFCQUFhLENBQUMsZUFBZTtLQUM5QjtDQUNGLENBQUEifQ==