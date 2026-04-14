"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCategoriesStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.syncCategoriesStep = (0, workflows_sdk_1.createStep)('sync-categories', async ({ filters, batchSize = 1000 }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    meilisearchService.enterSyncMode();
    try {
        const categoryFields = await meilisearchService.getFieldsForType('categories');
        const categoryIndexes = await meilisearchService.getIndexesByType('categories');
        const allCategoryIds = [];
        let offset = 0;
        let hasMore = true;
        while (hasMore) {
            const { data: categories } = await queryService.graph({
                entity: 'product_category',
                fields: categoryFields,
                pagination: {
                    take: batchSize,
                    skip: offset,
                },
                filters: {
                    is_active: true,
                    ...filters,
                },
            });
            if (categories.length === 0) {
                hasMore = false;
                break;
            }
            await Promise.all(categoryIndexes.map((index) => meilisearchService.addDocuments(index, categories)));
            allCategoryIds.push(...categories.map((c) => c.id));
            offset += batchSize;
            if (categories.length < batchSize) {
                hasMore = false;
            }
        }
        const validCategoryIds = new Set(allCategoryIds);
        const categoriesToDelete = new Set();
        for (const index of categoryIndexes) {
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
                    if (!validCategoryIds.has(hit.id)) {
                        categoriesToDelete.add(hit.id);
                    }
                });
                indexOffset += batchSize;
                if (indexedResult.hits.length < batchSize) {
                    hasMoreIndexed = false;
                }
            }
        }
        if (categoriesToDelete.size > 0) {
            const orphanedIds = Array.from(categoriesToDelete);
            for (let i = 0; i < orphanedIds.length; i += batchSize) {
                const batch = orphanedIds.slice(i, i + batchSize);
                await Promise.all(categoryIndexes.map((index) => meilisearchService.deleteDocuments(index, batch)));
            }
        }
        return new workflows_sdk_1.StepResponse({
            totalProcessed: allCategoryIds.length,
            totalDeleted: categoriesToDelete.size,
        });
    }
    finally {
        meilisearchService.exitSyncMode();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1jYXRlZ29yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9zeW5jLWNhdGVnb3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWtFO0FBRWxFLDJDQUEyRDtBQUMzRCwyREFBa0Y7QUFPckUsUUFBQSxrQkFBa0IsR0FBRyxJQUFBLDBCQUFVLEVBQzFDLGlCQUFpQixFQUNqQixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQXVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWtCLENBQUMsQ0FBQTtJQUVwRixrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUVsQyxJQUFJLENBQUM7UUFDTCxNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzlFLE1BQU0sZUFBZSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUE7UUFFL0UsTUFBTSxjQUFjLEdBQXlCLEVBQUUsQ0FBQTtRQUUvQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7UUFDZCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUE7UUFFbEIsT0FBTyxPQUFPLEVBQUUsQ0FBQztZQUNmLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNwRCxNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxTQUFTO29CQUNmLElB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