"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionUpsertHandler;
const upsert_option_1 = require("../workflows/upsert-option");
async function meilisearchOptionUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_option_1.upsertOptionWorkflow)(container).run({
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
    // Creation indexing disabled (see meilisearch-product-upsert): options are
    // created in bulk with their product, so creation indexing is handled by the
    // post-import batched sync. Only UPDATE events index live.
    // Workflow events
    // 'product-option.created',
    // 'product-option.updated',
    // Module events
    // ProductEvents.PRODUCT_OPTION_CREATED,
    // ProductEvents.PRODUCT_OPTION_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLGlEQWNDO0FBaEJELDhEQUFpRTtBQUVsRCxLQUFLLFVBQVUsOEJBQThCLENBQUMsRUFDM0QsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSxvQ0FBb0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDeEMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO0lBQ0wsMkVBQTJFO0lBQzNFLDZFQUE2RTtJQUM3RSwyREFBMkQ7SUFDM0Qsa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1Qiw0QkFBNEI7SUFDNUIsZ0JBQWdCO0lBQ2hCLHdDQUF3QztJQUN4Qyx3Q0FBd0M7S0FDekM7Q0FDRixDQUFBIn0=