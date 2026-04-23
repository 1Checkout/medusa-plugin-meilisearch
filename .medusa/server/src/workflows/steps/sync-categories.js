"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCategoriesStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.syncCategoriesStep = (0, workflows_sdk_1.createStep)('sync-categories', async ({ filters, batchSize = 1000 }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1jYXRlZ29yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9zeW5jLWNhdGVnb3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWtFO0FBRWxFLDJDQUEyRDtBQUMzRCwyREFBa0Y7QUFPckUsUUFBQSxrQkFBa0IsR0FBRyxJQUFBLDBCQUFVLEVBQzFDLGlCQUFpQixFQUNqQixLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3ZFLE1BQU0sa0JBQWtCLEdBQXVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWtCLENBQUMsQ0FBQTtJQUVwRixNQUFNLGNBQWMsR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzlFLE1BQU0sZUFBZSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFL0UsTUFBTSxjQUFjLEdBQXlCLEVBQUUsQ0FBQTtJQUUvQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDZCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUE7SUFFbEIsT0FBTyxPQUFPLEVBQUUsQ0FBQztRQUNmLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3BELE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxNQUFNO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLElB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