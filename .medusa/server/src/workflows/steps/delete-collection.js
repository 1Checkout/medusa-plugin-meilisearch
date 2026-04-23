"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollectionStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.deleteCollectionStep = (0, workflows_sdk_1.createStep)('delete-collection', async ({ collectionId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    let productIds = [];
    try {
        const { data: collections } = await queryService.graph({
            entity: 'product_collection',
            fields: ['products.id'],
            filters: { id: collectionId },
        });
        productIds = collections.flatMap((col) => col.products?.map((p) => p.id) || []).filter(Boolean);
    }
    catch {
        // Collection might be deleted
    }
    if (!productIds.length) {
        try {
            const { data: products } = await queryService.graph({
                entity: 'product',
                fields: ['id'],
                filters: { collection_id: collectionId },
            });
            productIds = products.map((p) => p.id).filter(Boolean);
        }
        catch {
            // Products not found
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2RlbGV0ZS1jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUFrRTtBQUNsRSwyQ0FBd0U7QUFDeEUsMkRBQWtGO0FBTXJFLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSwwQkFBVSxFQUM1QyxtQkFBbUIsRUFDbkIsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ25ELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxrQkFBa0IsR0FBdUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBRXBGLElBQUksVUFBVSxHQUFhLEVBQUUsQ0FBQTtJQUU3QixJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztZQUNyRCxNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN2QixPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFO1NBQzlCLENBQUMsQ0FBQTtRQUVGLFVBQVUsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakgsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLDhCQUE4QjtJQUNoQyxDQUFDO0lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDbEQsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFO2FBQ3pDLENBQUMsQ0FBQTtZQUNGLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxxQkFBcUI7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSw0QkFBWSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUVELE1BQU0sYUFBYSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEcsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVqRyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNsRCxNQUFNLEVBQUUsU0FBUztRQUNqQixNQUFNLEVBQUUsYUFBYTtRQUNyQixPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7S0FDMUMsQ0FBQyxDQUFBO0lBRUYsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDdEQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUcsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUNILENBQUE7SUFFRCxPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDdkMsQ0FBQyxDQUNGLENBQUEifQ==