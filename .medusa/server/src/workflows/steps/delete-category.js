"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const meilisearch_1 = require("../../modules/meilisearch");
exports.deleteCategoryStep = (0, workflows_sdk_1.createStep)('delete-category', async ({ categoryId }, { container }) => {
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const categoryIndexes = await meilisearchService.getIndexesByType('categories');
    await Promise.all(categoryIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, categoryId)));
    return new workflows_sdk_1.StepResponse({
        categoryId,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy9kZWxldGUtY2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWtFO0FBQ2xFLDJEQUFrRjtBQU1yRSxRQUFBLGtCQUFrQixHQUFHLElBQUEsMEJBQVUsRUFBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQWEsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDakgsTUFBTSxrQkFBa0IsR0FBdUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBQ3BGLE1BQU0sZUFBZSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFL0UsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTdHLE9BQU8sSUFBSSw0QkFBWSxDQUFDO1FBQ3RCLFVBQVU7S0FDWCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9