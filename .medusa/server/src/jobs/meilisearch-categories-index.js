"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCategoriesIndexJob;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const sync_categories_1 = require("../workflows/sync-categories");
/**
 * Wrapper workflow that uses runAsStep to properly handle container context.
 * This is required because jobs are wrapped as workflows by Medusa's Redis workflow engine,
 * and calling workflows directly with container.run() causes ContainerLike compatibility issues.
 */
const triggerOnStart = 0;
const categoriesIndexJobWorkflow = (0, workflows_sdk_1.createWorkflow)('categories-index-job-workflow', () => {
    const result = sync_categories_1.syncCategoriesWorkflow.runAsStep({
        input: {},
    });
    return new workflows_sdk_1.WorkflowResponse(result);
});
async function meilisearchCategoriesIndexJob(container) {
    const logger = container.resolve('logger');
    logger.info('Starting category indexing...');
    const { result: { totalProcessed, totalDeleted }, } = await categoriesIndexJobWorkflow(container).run();
    logger.info(`Successfully indexed ${totalProcessed} categories and deleted ${totalDeleted} categories`);
}
exports.config = {
    name: 'meilisearch-categories-index',
    schedule: '* * * * *',
    numberOfExecutions: triggerOnStart,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY2F0ZWdvcmllcy1pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9qb2JzL21laWxpc2VhcmNoLWNhdGVnb3JpZXMtaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBb0JBLGdEQVNDO0FBNUJELDJEQUEwRTtBQUUxRSxrRUFBcUU7QUFFckU7Ozs7R0FJRztBQUVILE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQTtBQUV4QixNQUFNLDBCQUEwQixHQUFHLElBQUEsOEJBQWMsRUFBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDdEYsTUFBTSxNQUFNLEdBQUcsd0NBQXNCLENBQUMsU0FBUyxDQUFDO1FBQzlDLEtBQUssRUFBRSxFQUFFO0tBQ1YsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBRWEsS0FBSyxVQUFVLDZCQUE2QixDQUFDLFNBQTBCO0lBQ3BGLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO0lBRTVDLE1BQU0sRUFDSixNQUFNLEVBQUUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLEdBQ3pDLEdBQUcsTUFBTSwwQkFBMEIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVyRCxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixjQUFjLDJCQUEyQixZQUFZLGFBQWEsQ0FBQyxDQUFBO0FBQ3pHLENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBa0I7SUFDbkMsSUFBSSxFQUFFLDhCQUE4QjtJQUNwQyxRQUFRLEVBQUUsV0FBVztJQUNyQixrQkFBa0IsRUFBRSxjQUFjO0NBQ25DLENBQUEifQ==