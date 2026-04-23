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
    numberOfExecutions: 1,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY2F0ZWdvcmllcy1pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9qb2JzL21laWxpc2VhcmNoLWNhdGVnb3JpZXMtaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBaUJBLGdEQVNDO0FBekJELDJEQUEwRTtBQUUxRSxrRUFBcUU7QUFFckU7Ozs7R0FJRztBQUNILE1BQU0sMEJBQTBCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtJQUN0RixNQUFNLE1BQU0sR0FBRyx3Q0FBc0IsQ0FBQyxTQUFTLENBQUM7UUFDOUMsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFDLENBQUE7QUFFYSxLQUFLLFVBQVUsNkJBQTZCLENBQUMsU0FBMEI7SUFDcEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUE7SUFFNUMsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsR0FDekMsR0FBRyxNQUFNLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRXJELE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGNBQWMsMkJBQTJCLFlBQVksYUFBYSxDQUFDLENBQUE7QUFDekcsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFrQjtJQUNuQyxJQUFJLEVBQUUsOEJBQThCO0lBQ3BDLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLGtCQUFrQixFQUFFLENBQUM7Q0FDdEIsQ0FBQSJ9