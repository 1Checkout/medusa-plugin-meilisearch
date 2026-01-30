"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchSyncHandler;
const sync_categories_1 = require("../workflows/sync-categories");
const sync_products_1 = require("../workflows/sync-products");
async function meilisearchSyncHandler({ container }) {
    const logger = container.resolve('logger');
    logger.info('Starting MeiliSearch indexing...');
    try {
        const { result: { totalProcessed: categoriesProcessed, totalDeleted: categoriesDeleted }, } = await (0, sync_categories_1.syncCategoriesWorkflow)(container).run({
            input: {},
        });
        logger.info(`Successfully indexed ${categoriesProcessed} categories and deleted ${categoriesDeleted} categories`);
        const { result: { totalProcessed: productsProcessed, totalDeleted: productsDeleted }, } = await (0, sync_products_1.syncProductsWorkflow)(container).run({
            input: {},
        });
        logger.info(`Successfully indexed ${productsProcessed} products and deleted ${productsDeleted} products`);
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}
exports.config = {
    event: 'meilisearch.sync',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1zeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHlDQXVCQztBQTFCRCxrRUFBcUU7QUFDckUsOERBQWlFO0FBRWxELEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxFQUFFLFNBQVMsRUFBa0I7SUFDaEYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7SUFFL0MsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsR0FDakYsR0FBRyxNQUFNLElBQUEsd0NBQXNCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzlDLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsbUJBQW1CLDJCQUEyQixpQkFBaUIsYUFBYSxDQUFDLENBQUE7UUFFakgsTUFBTSxFQUNKLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLEdBQzdFLEdBQUcsTUFBTSxJQUFBLG9DQUFvQixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM1QyxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLGlCQUFpQix5QkFBeUIsZUFBZSxXQUFXLENBQUMsQ0FBQTtJQUMzRyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsa0JBQWtCO0NBQzFCLENBQUEifQ==