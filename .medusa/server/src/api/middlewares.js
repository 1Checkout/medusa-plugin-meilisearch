"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@medusajs/framework");
const route_1 = require("./store/meilisearch/categories-hits/route");
const route_2 = require("./store/meilisearch/products-hits/route");
const route_3 = require("./store/meilisearch/products/route");
const route_4 = require("./store/meilisearch/categories/route");
const route_5 = require("./admin/meilisearch/categories-hits/route");
const route_6 = require("./admin/meilisearch/products-hits/route");
exports.default = (0, framework_1.defineMiddlewares)({
    routes: [
        {
            methods: ['GET'],
            matcher: '/store/meilisearch/categories-hits',
            middlewares: [(0, framework_1.validateAndTransformQuery)(route_1.StoreSearchCategoriesSchema, {})],
        },
        {
            methods: ['GET'],
            matcher: '/store/meilisearch/products-hits',
            middlewares: [(0, framework_1.validateAndTransformQuery)(route_2.StoreSearchProductsSchema, {})],
        },
        {
            methods: ['GET'],
            matcher: '/store/meilisearch/products',
            middlewares: [(0, framework_1.validateAndTransformQuery)(route_3.StoreProductsSchema, {})],
        },
        {
            methods: ['GET'],
            matcher: '/store/meilisearch/categories',
            middlewares: [(0, framework_1.validateAndTransformQuery)(route_4.StoreCategoriesSchema, {})],
        },
        {
            methods: ['POST'],
            matcher: '/admin/meilisearch/categories-hits',
            middlewares: [(0, framework_1.validateAndTransformBody)(route_5.AdminSearchCategoriesSchema)],
        },
        {
            methods: ['POST'],
            matcher: '/admin/meilisearch/products-hits',
            middlewares: [(0, framework_1.validateAndTransformBody)(route_6.AdminSearchProductsSchema)],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTRHO0FBQzVHLHFFQUF1RjtBQUN2RixtRUFBbUY7QUFDbkYsOERBQXdFO0FBQ3hFLGdFQUE0RTtBQUM1RSxxRUFBdUY7QUFDdkYsbUVBQW1GO0FBRW5GLGtCQUFlLElBQUEsNkJBQWlCLEVBQUM7SUFDL0IsTUFBTSxFQUFFO1FBQ047WUFDRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxXQUFXLEVBQUUsQ0FBQyxJQUFBLHFDQUF5QixFQUFDLG1DQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxXQUFXLEVBQUUsQ0FBQyxJQUFBLHFDQUF5QixFQUFDLGlDQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxXQUFXLEVBQUUsQ0FBQyxJQUFBLHFDQUF5QixFQUFDLDJCQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDaEIsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxXQUFXLEVBQUUsQ0FBQyxJQUFBLHFDQUF5QixFQUFDLDZCQUFxQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDakIsT0FBTyxFQUFFLG9DQUFvQztZQUM3QyxXQUFXLEVBQUUsQ0FBQyxJQUFBLG9DQUF3QixFQUFDLG1DQUEyQixDQUFDLENBQUM7U0FDckU7UUFDRDtZQUNFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLFdBQVcsRUFBRSxDQUFDLElBQUEsb0NBQXdCLEVBQUMsaUNBQXlCLENBQUMsQ0FBQztTQUNuRTtLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=