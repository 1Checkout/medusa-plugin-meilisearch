"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCategoriesSchema = void 0;
exports.GET = GET;
const zod_1 = __importDefault(require("zod"));
const framework_1 = require("@medusajs/framework");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../../../modules/meilisearch");
// Schema that combines standard MedusaJS category query params with meilisearch params
exports.StoreCategoriesSchema = zod_1.default.object({
    // Standard MedusaJS v2 category query parameters
    fields: zod_1.default.string().optional(),
    limit: zod_1.default.coerce.number().default(50).optional(),
    offset: zod_1.default.coerce.number().default(0).optional(),
    // Meilisearch-specific parameters
    query: zod_1.default.string().optional(),
    language: zod_1.default.string().optional(),
    semanticSearch: zod_1.default.coerce.boolean().default(false).optional(),
    semanticRatio: zod_1.default.coerce.number().min(0).max(1).default(0.5).optional(),
});
async function GET(req, res) {
    const { 
    // Meilisearch params
    query, language, semanticSearch = false, semanticRatio = 0.5, 
    // Extract standard MedusaJS params separately
    ...standardQuery } = req.validatedQuery;
    const queryService = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    // Use prepareListQuery to handle field selectors and other standard parameters
    const queryConfig = (0, framework_1.prepareListQuery)(standardQuery, {
        defaults: ['id', 'name', 'handle'],
        isList: true,
    });
    // Extract query parameters manually for custom filter logic
    const { limit, offset } = standardQuery;
    // Build standard Medusa filters
    const filters = {};
    let categoryIds = [];
    let totalCount = 0;
    // If meilisearch query parameters are provided, use meilisearch for filtering
    if (query || semanticSearch) {
        const indexes = await meilisearchService.getIndexesByType('categories');
        const results = await Promise.all(indexes.map(async (indexKey) => {
            return await meilisearchService.search(indexKey, query || '', {
                language,
                paginationOptions: {
                    limit,
                    offset,
                },
                semanticSearch,
                semanticRatio,
            });
        }));
        // Merge results from all indexes
        const mergedResults = results.reduce((acc, result) => {
            return {
                hits: [...acc.hits, ...result.hits],
                estimatedTotalHits: (acc.estimatedTotalHits || 0) + (result.estimatedTotalHits || 0),
                processingTimeMs: Math.max(acc.processingTimeMs, result.processingTimeMs),
                query: result.query,
            };
        }, { hits: [], estimatedTotalHits: 0, processingTimeMs: 0, query: query || '' });
        categoryIds = mergedResults.hits.map((hit) => hit.id);
        totalCount = mergedResults.estimatedTotalHits ?? 0;
        // If we have meilisearch results, filter by those IDs
        if (categoryIds.length > 0) {
            filters.id = { $in: categoryIds };
        }
        else {
            // No results from meilisearch, return empty response
            res.json({
                categories: [],
                count: 0,
                limit,
                offset,
            });
            return;
        }
    }
    // Fetch categories using the standard Medusa query service with prepareListQuery config
    const { data: categories, metadata } = await queryService.graph({
        entity: 'product_category',
        ...queryConfig.remoteQueryConfig,
        filters,
    });
    // If we used meilisearch, preserve the order from the search results
    let orderedCategories = categories;
    if (query || semanticSearch) {
        const categoryIdOrder = categoryIds;
        orderedCategories = categories.sort((a, b) => {
            const aIndex = categoryIdOrder.indexOf(a.id);
            const bIndex = categoryIdOrder.indexOf(b.id);
            return aIndex - bIndex;
        });
    }
    res.json({
        categories: orderedCategories,
        count: query || semanticSearch ? totalCount : metadata?.count || categories.length,
        offset,
        limit,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL21laWxpc2VhcmNoL2NhdGVnb3JpZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBNEJBLGtCQXNHQztBQWxJRCw4Q0FBbUI7QUFDbkIsbURBQXFGO0FBQ3JGLDJDQUEyRDtBQUUzRCxpRUFBd0Y7QUFFeEYsdUZBQXVGO0FBQzFFLFFBQUEscUJBQXFCLEdBQUcsYUFBQyxDQUFDLE1BQU0sQ0FBQztJQUM1QyxpREFBaUQ7SUFDakQsTUFBTSxFQUFFLGFBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDN0IsS0FBSyxFQUFFLGFBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMvQyxNQUFNLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQy9DLGtDQUFrQztJQUNsQyxLQUFLLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM1QixRQUFRLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQixjQUFjLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzVELGFBQWEsRUFBRSxhQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUN2RSxDQUFDLENBQUE7QUFXSyxLQUFLLFVBQVUsR0FBRyxDQUFDLEdBQThDLEVB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