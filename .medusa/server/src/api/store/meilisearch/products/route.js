"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreProductsSchema = void 0;
exports.GET = GET;
const zod_1 = __importDefault(require("zod"));
const framework_1 = require("@medusajs/framework");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../../../modules/meilisearch");
// Schema that combines standard MedusaJS product query params with meilisearch params
exports.StoreProductsSchema = zod_1.default.object({
    // Standard MedusaJS v2 product query parameters
    fields: zod_1.default.string().optional(),
    limit: zod_1.default.coerce.number().default(50).optional(),
    offset: zod_1.default.coerce.number().default(0).optional(),
    region_id: zod_1.default.string().optional(),
    currency_code: zod_1.default.string().optional(),
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
        defaults: ['id', 'title', 'handle', 'status'],
        isList: true,
    });
    // Extract query parameters manually for custom filter logic
    const { limit, offset, region_id, currency_code } = standardQuery;
    // Build standard Medusa filters
    const filters = {};
    let productIds = [];
    let totalCount = 0;
    // If meilisearch query parameters are provided, use meilisearch for filtering
    if (query || semanticSearch) {
        const indexes = await meilisearchService.getIndexesByType('products');
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
        productIds = mergedResults.hits.map((hit) => hit.id);
        totalCount = mergedResults.estimatedTotalHits ?? 0;
        // If we have meilisearch results, filter by those IDs
        if (productIds.length > 0) {
            filters.id = { $in: productIds };
        }
        else {
            // No results from meilisearch, return empty response
            res.json({
                products: [],
                count: 0,
                limit,
                offset,
            });
            return;
        }
    }
    // Build context for region and currency - always include currency_code for price calculations
    const context = {
        variants: {
            calculated_price: (0, utils_1.QueryContext)({
                region_id,
                currency_code,
            }),
        },
    };
    // Fetch products using the standard Medusa query service with prepareListQuery config
    const { data: products, metadata } = await queryService.graph({
        entity: 'product',
        ...queryConfig.remoteQueryConfig,
        filters,
        context,
    });
    // If we used meilisearch, preserve the order from the search results
    let orderedProducts = products;
    if (query || semanticSearch) {
        const productIdOrder = productIds;
        orderedProducts = products.sort((a, b) => {
            const aIndex = productIdOrder.indexOf(a.id);
            const bIndex = productIdOrder.indexOf(b.id);
            return aIndex - bIndex;
        });
    }
    res.json({
        products: orderedProducts,
        count: query || semanticSearch ? totalCount : metadata?.count || products.length,
        offset,
        limit,
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL21laWxpc2VhcmNoL3Byb2R1Y3RzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQThCQSxrQkFpSEM7QUEvSUQsOENBQW1CO0FBQ25CLG1EQUFxRjtBQUNyRiwyQ0FBeUU7QUFFekUsaUVBQXdGO0FBRXhGLHNGQUFzRjtBQUN6RSxRQUFBLG1CQUFtQixHQUFHLGFBQUMsQ0FBQyxNQUFNLENBQUM7SUFDMUMsZ0RBQWdEO0lBQ2hELE1BQU0sRUFBRSxhQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdCLEtBQUssRUFBRSxhQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDL0MsTUFBTSxFQUFFLGFBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMvQyxTQUFTLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNoQyxhQUFhLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxrQ0FBa0M7SUFDbEMsS0FBSyxFQUFFLGFBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDNUIsUUFBUSxFQUFFLGFBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDL0IsY0FBYyxFQUFFLGFBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUM1RCxhQUFhLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFD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