"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProductsStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.syncProductsStep = (0, workflows_sdk_1.createStep)('sync-products', async ({ filters, batchSize = 1000 }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const productFields = await meilisearchService.getFieldsForType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    const allProductIds = [];
    let offset = 0;
    let hasMore = true;
    while (hasMore) {
        const { data: products } = await queryService.graph({
            entity: 'product',
            fields: productFields,
            pagination: {
                take: batchSize,
                skip: offset,
            },
            filters: {
                status: 'published',
                ...filters,
            },
        });
        if (products.length === 0) {
            hasMore = false;
            break;
        }
        await Promise.all(productIndexes.map((index) => meilisearchService.addDocuments(index, products)));
        allProductIds.push(...products.map((p) => p.id));
        offset += batchSize;
        if (products.length < batchSize) {
            hasMore = false;
        }
    }
    const validProductIds = new Set(allProductIds);
    const productsToDelete = new Set();
    for (const index of productIndexes) {
        let indexOffset = 0;
        let hasMoreIndexed = true;
        while (hasMoreIndexed) {
            const indexedResult = await meilisearchService.search(index, '', {
                attributesToRetrieve: ['id'],
                paginationOptions: {
                    offset: indexOffset,
                    limit: batchSize,
                },
            });
            if (indexedResult.hits.length === 0) {
                hasMoreIndexed = false;
                break;
            }
            indexedResult.hits.forEach((hit) => {
                if (!validProductIds.has(hit.id)) {
                    productsToDelete.add(hit.id);
                }
            });
            indexOffset += batchSize;
            if (indexedResult.hits.length < batchSize) {
                hasMoreIndexed = false;
            }
        }
    }
    if (productsToDelete.size > 0) {
        const orphanedIds = Array.from(productsToDelete);
        for (let i = 0; i < orphanedIds.length; i += batchSize) {
            const batch = orphanedIds.slice(i, i + batchSize);
            await Promise.all(productIndexes.map((index) => meilisearchService.deleteDocuments(index, batch)));
        }
    }
    return new workflows_sdk_1.StepResponse({
        totalProcessed: allProductIds.length,
        totalDeleted: productsToDelete.size,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvc3luYy1wcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBa0U7QUFDbEUsMkNBQXdFO0FBRXhFLDJEQUFrRjtBQU9yRSxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxrQkFBa0IsR0FBdUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBRXBGLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEcsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVqRyxNQUFNLGFBQWEsR0FBaUIsRUFBRSxDQUFBO0lBRXRDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtJQUVsQixPQUFPLE9BQU8sRUFBRSxDQUFDO1FBQ2YsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDbEQsTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLGFBQWE7WUFDckIsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxNQUFNO2FBQ2I7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