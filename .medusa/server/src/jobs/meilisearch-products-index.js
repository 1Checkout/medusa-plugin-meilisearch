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
    numberOfExecutions: 1,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJvZHVjdHMtaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvam9icy9tZWlsaXNlYXJjaC1wcm9kdWN0cy1pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFpQkEsOENBU0M7QUF6QkQsMkRBQTBFO0FBRTFFLDhEQUFpRTtBQUVqRTs7OztHQUlHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBRyxJQUFBLDhCQUFjLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFFO0lBQ2xGLE1BQU0sTUFBTSxHQUFHLG9DQUFvQixDQUFDLFNBQVMsQ0FBQztRQUM1QyxLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUMsQ0FBQTtJQUNGLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUMsQ0FBQTtBQUVhLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxTQUEwQjtJQUNsRixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUUzQyxNQUFNLEVBQ0osTUFBTSxFQUFFLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxHQUN6QyxHQUFHLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7SUFFbkQsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsY0FBYyx5QkFBeUIsWUFBWSxXQUFXLENBQUMsQ0FBQTtBQUNyRyxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQWtCO0lBQ25DLElBQUksRUFBRSw0QkFBNEI7SUFDbEMsUUFBUSxFQUFFLFdBQVc7SUFDckIsa0JBQWtCLEVBQUUsQ0FBQztDQUN0QixDQUFBIn0=