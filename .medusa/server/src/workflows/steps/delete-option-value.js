"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOptionValueStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.deleteOptionValueStep = (0, workflows_sdk_1.createStep)('delete-value', async ({ optionValueId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const productModuleService = container.resolve(utils_1.Modules.PRODUCT);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    let productId = null;
    try {
        const { data: optionValues } = await queryService.graph({
            entity: 'product_option_value',
            fields: ['option.product_id'],
            filters: { id: optionValueId },
        });
        if (optionValues.length && optionValues[0].option?.product_id) {
            productId = optionValues[0].option.product_id;
        }
    }
    catch {
        // Option value might be deleted
    }
    if (!productId) {
        try {
            const [optionValue] = await productModuleService.listProductOptionValues({ id: optionValueId }, { withDeleted: true, select: ['option_id'] });
            if (optionValue?.option_id) {
                const [option] = await productModuleService.listProductOptions({ id: optionValue.option_id }, { withDeleted: true, select: ['product_id'] });
                if (option?.product_id) {
                    productId = option.product_id;
                }
            }
        }
        catch {
            // Option value not found
        }
    }
    if (!productId) {
        return new workflows_sdk_1.StepResponse({ products: [] });
    }
    const productFields = await meilisearchService.getFieldsForType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const { data: products } = await queryService.graph({
        entity: 'product',
        fields: productFields,
        filters: { id: productId },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW9wdGlvbi12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvZGVsZXRlLW9wdGlvbi12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBa0U7QUFDbEUsMkNBQWlGO0FBQ2pGLDJEQUFrRjtBQU1yRSxRQUFBLHFCQUFxQixHQUFHLElBQUEsMEJBQVUsRUFBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3BILE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxvQkFBb0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvRCxNQUFNLGtCQUFrQixHQUF1QixTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsSUFBSSxTQUFTLEdBQWtCLElBQUksQ0FBQTtJQUVuQyxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUN0RCxNQUFNLEVBQUUsc0JBQXNCO1lBQzlCLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUU7U0FDL0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxZQUFZLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDOUQsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBQy9DLENBQUM7SUFDSCxDQUFDO0lBQUMsTUFBTSxDQUFD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