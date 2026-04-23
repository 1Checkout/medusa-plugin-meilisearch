"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCategoryStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.upsertCategoryStep = (0, workflows_sdk_1.createStep)('upsert-category', async ({ categoryId }, { container }) => {
    const queryService = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const categoryFields = await meilisearchService.getFieldsForType('categories');
    const categoryIndexes = await meilisearchService.getIndexesByType('categories');
    const { data: categories } = await queryService.graph({
        entity: 'product_category',
        fields: categoryFields,
        filters: { id: categoryId },
    });
    await Promise.all(categories.map(async (category) => {
        if (category.is_active) {
            await Promise.all(categoryIndexes.map((indexKey) => meilisearchService.addDocuments(indexKey, [category])));
        }
        else {
            await Promise.all(categoryIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, category.id)));
        }
    }));
    return new workflows_sdk_1.StepResponse({
        categories,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LWNhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zdGVwcy91cHNlcnQtY2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQWtFO0FBQ2xFLDJDQUEyRDtBQUMzRCwyREFBa0Y7QUFNckUsUUFBQSxrQkFBa0IsR0FBRyxJQUFBLDBCQUFVLEVBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFhLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2pILE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkUsTUFBTSxrQkFBa0IsR0FBdUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBRXBGLE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDOUUsTUFBTSxlQUFlLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUUvRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztRQUNwRCxNQUFNLEVBQUUsa0JBQWtCO1FBQzFCLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDN0csQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hILENBQUM7SUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFBO0lBRUQsT0FBTyxJQUFJLDRCQUFZLENBQUM7UUFDdEIsVUFBVTtLQUNYLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=