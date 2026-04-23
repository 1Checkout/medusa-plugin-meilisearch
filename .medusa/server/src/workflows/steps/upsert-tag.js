"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertTagStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.upsertTagStep = (0, workflows_sdk_1.createStep)('upsert-tag', async ({ tagId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const { data: tags } = await queryService.graph({
        entity: 'product_tag',
        fields: ['products.id'],
        filters: { id: tagId },
    });
    const productIds = tags.flatMap((tag) => tag.products?.map((p) => p.id) || []).filter(Boolean);
    if (!productIds.length) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const productFields = await meilisearchService.getFieldsForType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const { data: products } = await queryService.graph({
        entity: 'product',
        fields: productFields,
        filters: { id: [...new Set(productIds)] },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvdXBzZXJ0LXRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBa0U7QUFDbEUsMkNBQXdFO0FBQ3hFLDJEQUFrRjtBQU1yRSxRQUFBLGFBQWEsR0FBRyxJQUFBLDBCQUFVLEVBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNsRyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQXVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWtCLENBQUMsQ0FBQTtJQUVwRixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QyxNQUFNLEVBQUUsYUFBYTtRQUNyQixNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7UUFDdkIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRTtLQUN2QixDQUFDLENBQUE7SUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFOUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxNQUFNLGFBQWEsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLG1CQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hHLE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFakcsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLGFBQWE7UUFDckIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO0tBQzFDLENBQUMsQ0FBQTtJQUVGLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQ3RELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0csQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlHLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQyxDQUFBIn0=