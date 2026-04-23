"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPriceStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.upsertPriceStep = (0, workflows_sdk_1.createStep)('upsert-price', async ({ priceId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const { data: prices } = await queryService.graph({
        entity: 'price',
        fields: ['price_set_id'],
        filters: { id: priceId },
    });
    if (!prices.length || !prices[0].price_set_id) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const { data: links } = await queryService.graph({
        entity: 'product_variant_price_set',
        fields: ['variant_id'],
        filters: { price_set_id: prices[0].price_set_id },
    });
    const variantIds = links.map((l) => l.variant_id).filter(Boolean);
    if (!variantIds.length) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const { data: variants } = await queryService.graph({
        entity: 'product_variant',
        fields: ['product_id'],
        filters: { id: variantIds },
    });
    const productIds = [...new Set(variants.map((v) => v.product_id).filter(Boolean))];
    if (!productIds.length) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const productFields = await meilisearchService.getFieldsForType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const { data: products } = await queryService.graph({
        entity: 'product',
        fields: productFields,
        filters: { id: productIds },
    });
    await Promise.all(products.map(async (product) => {
        if (!product.status || product.status === 'published') {
            await Promise.all(productIndexes.map((indexKey) => meilisearchService.addDocuments(indexKey, [product])));
        }
        else {
            await Promise.all(productIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, product.id)));
        }
    }));
    return new workflows_sdk_1.StepResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXByaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy91cHNlcnQtcHJpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWtFO0FBQ2xFLDJDQUF3RTtBQUN4RSwyREFBa0Y7QUFNckUsUUFBQSxlQUFlLEdBQUcsSUFBQSwwQkFBVSxFQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQWEsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDeEcsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2RSxNQUFNLGtCQUFrQixHQUF1QixTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEQsTUFBTSxFQUFFLE9BQU87UUFDZixNQUFNLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDeEIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRTtLQUN6QixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMvQyxNQUFNLEVBQUUsMkJBQTJCO1FBQ25DLE1BQU0sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN0QixPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFD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