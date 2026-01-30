"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchProductsIndexJob;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const sync_products_1 = require("../workflows/sync-products");
/**
 * Wrapper workflow that uses runAsStep to properly handle container context.
 * This is required because jobs are wrapped as workflows by Medusa's Redis workflow engine,
 * and calling workflows directly with container.run() causes ContainerLike compatibility issues.
 */
const triggerOnStart = 0;
const productsIndexJobWorkflow = (0, workflows_sdk_1.createWorkflow)('products-index-job-workflow', () => {
    const result = sync_products_1.syncProductsWorkflow.runAsStep({
        input: {},
    });
    return new workflows_sdk_1.WorkflowResponse(result);
});
async function meilisearchProductsIndexJob(container) {
    const logger = container.resolve('logger');
    logger.info('Starting product indexing...');
    const { result: { totalProcessed, totalDeleted }, } = await productsIndexJobWorkflow(container).run();
    logger.info(`Successfully indexed ${totalProcessed} products and deleted ${totalDeleted} products`);
}
exports.config = {
    name: 'meilisearch-products-index',
    schedule: '* * * * *',
    numberOfExecutions: triggerOnStart,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJvZHVjdHMtaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvam9icy9tZWlsaXNlYXJjaC1wcm9kdWN0cy1pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFvQkEsOENBU0M7QUE1QkQsMkRBQTBFO0FBRTFFLDhEQUFpRTtBQUVqRTs7OztHQUlHO0FBRUgsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFBO0FBRXhCLE1BQU0sd0JBQXdCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtJQUNsRixNQUFNLE1BQU0sR0FBRyxvQ0FBb0IsQ0FBQyxTQUFTLENBQUM7UUFDNUMsS0FBSyxFQUFFLEVBQUU7S0FDVixDQUFDLENBQUE7SUFDRixPQUFPLElBQUksZ0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFDLENBQUE7QUFFYSxLQUFLLFVBQVUsMkJBQTJCLENBQUMsU0FBMEI7SUFDbEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFFM0MsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsR0FDekMsR0FBRyxNQUFNLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGNBQWMseUJBQXlCLFlBQVksV0FBVyxDQUFDLENBQUE7QUFDckcsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFrQjtJQUNuQyxJQUFJLEVBQUUsNEJBQTRCO0lBQ2xDLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLGtCQUFrQixFQUFFLGNBQWM7Q0FDbkMsQ0FBQSJ9