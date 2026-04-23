"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProductStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.upsertProductStep = (0, workflows_sdk_1.createStep)('upsert-products', async ({ productId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const productFields = await meilisearchService.getFieldsForType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const { data: products } = await queryService.graph({
        entity: 'product',
        fields: productFields,
        filters: { id: productId },
    });
    console.log('--- UPSERT PRODUCT');
    await Promise.all(products.map(async (product) => {
        if (!product.status || product.status === 'published') {
            await Promise.all(productIndexes.map((indexKey) => meilisearchService.addDocuments(indexKey, [product])));
        }
        else {
            await Promise.all(productIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, product.id)));
        }
    }));
    return new workflows_sdk_1.StepResponse({
        products,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL3Vwc2VydC1wcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUFrRTtBQUNsRSwyQ0FBd0U7QUFDeEUsMkRBQWtGO0FBTXJFLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSwwQkFBVSxFQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUMvRyxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQXVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWtCLENBQUMsQ0FBQTtJQUVwRixNQUFNLGFBQWEsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLG1CQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ2hHLE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFakcsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxFQUFFLFNBQVM7UUFDakIsTUFBTSxFQUFFLGFBQWE7UUFDckIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRTtLQUMzQixDQUFDLENBQUE7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFakMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdEQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUcsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUNILENBQUE7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQztRQUN0QixRQUFRO0tBQ1QsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEifQ==