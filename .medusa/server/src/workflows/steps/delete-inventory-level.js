"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryLevelStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.deleteInventoryLevelStep = (0, workflows_sdk_1.createStep)('delete-inventory-level', async ({ inventoryLevelId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const inventoryModuleService = container.resolve(utils_1.Modules.INVENTORY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    let inventoryItemId = null;
    try {
        const { data: levels } = await queryService.graph({
            entity: 'inventory_level',
            fields: ['inventory_item_id'],
            filters: { id: inventoryLevelId },
        });
        if (levels.length && levels[0].inventory_item_id) {
            inventoryItemId = levels[0].inventory_item_id;
        }
    }
    catch {
        // Level might be deleted
    }
    if (!inventoryItemId) {
        try {
            const [level] = await inventoryModuleService.listInventoryLevels({ id: inventoryLevelId }, { withDeleted: true, select: ['inventory_item_id'] });
            if (level?.inventory_item_id) {
                inventoryItemId = level.inventory_item_id;
            }
        }
        catch {
            // Level not found
        }
    }
    if (!inventoryItemId) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const { data: links } = await queryService.graph({
        entity: 'product_variant_inventory_item',
        fields: ['variant_id'],
        filters: { inventory_item_id: inventoryItemId },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWludmVudG9yeS1sZXZlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvZGVsZXRlLWludmVudG9yeS1sZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBa0U7QUFDbEUsMkNBQWlGO0FBQ2pGLDJEQUFrRjtBQU1yRSxRQUFBLHdCQUF3QixHQUFHLElBQUEsMEJBQVUsRUFDaEQsd0JBQXdCLEVBQ3hCLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3ZELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNuRSxNQUFNLGtCQUFrQixHQUF1QixTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsSUFBSSxlQUFlLEdBQWtCLElBQUksQ0FBQTtJQUV6QyxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNoRCxNQUFNLEVBQUUsaUJBQWlCO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRTtTQUNsQyxDQUFDLENBQUE7UUFFRixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDakQsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQTtRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUFDLE1BQU0sQ0FBQztR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