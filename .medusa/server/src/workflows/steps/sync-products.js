"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProductsStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.syncProductsStep = (0, workflows_sdk_1.createStep)('sync-products', async ({ filters, batchSize = 1000 }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    meilisearchService.enterSyncMode();
    try {
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
    }
    finally {
        meilisearchService.exitSyncMode();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3RlcHMvc3luYy1wcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBa0U7QUFDbEUsMkNBQXdFO0FBRXhFLDJEQUFrRjtBQU9yRSxRQUFBLGdCQUFnQixHQUFHLElBQUEsMEJBQVUsRUFDeEMsZUFBZSxFQUNmLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2hFLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxrQkFBa0IsR0FBdUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBRXBGLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFBO0lBRWxDLElBQUksQ0FBQztRQUNMLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEcsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVqRyxNQUFNLGFBQWEsR0FBaUIsRUFBRSxDQUFBO1FBRXRDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUNkLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQTtRQUVsQixPQUFPLE9BQU8sRUFBRSxDQUFDO1lBQ2YsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2xELE1BQU0sRUFBRSxTQUFTO2dCQUNqQixNQUFNLEVBQUUsYUFBYTtnQkFDckIsVUFBVSxF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