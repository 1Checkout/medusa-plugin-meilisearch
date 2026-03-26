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
    const queryConfig = await (0, framework_1.prepareListQuery)(standardQuery, {
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
        ...queryConfig.remoteQueryConfig,
        entity: 'product_category',
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