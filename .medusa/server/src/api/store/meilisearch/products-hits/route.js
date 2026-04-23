"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSearchProductsSchema = void 0;
exports.GET = GET;
const zod_1 = __importDefault(require("zod"));
const meilisearch_1 = require("../../../../modules/meilisearch");
exports.StoreSearchProductsSchema = zod_1.default.object({
    query: zod_1.default.string(),
    limit: zod_1.default.coerce.number().default(10),
    offset: zod_1.default.coerce.number().default(0),
    language: zod_1.default.string().optional(),
    semanticSearch: zod_1.default.coerce.boolean().default(false),
    semanticRatio: zod_1.default.coerce.number().min(0).max(1).default(0.5),
});
async function GET(req, res) {
    const { query, language, limit, offset, semanticSearch, semanticRatio } = req.validatedQuery;
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const indexes = await meilisearchService.getIndexesByType('products');
    const results = await Promise.all(indexes.map(async (indexKey) => {
        return await meilisearchService.search(indexKey, query, {
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
            // Include vector search metadata if available
            ...(semanticSearch && {
                hybridSearch: true,
                semanticRatio,
            }),
        };
    }, { hits: [], estimatedTotalHits: 0, processingTimeMs: 0, query });
    res.json(mergedResults);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL21laWxpc2VhcmNoL3Byb2R1Y3RzLWhpdHMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBa0JBLGtCQXlDQztBQTNERCw4Q0FBbUI7QUFHbkIsaUVBQXdGO0FBRTNFLFFBQUEseUJBQXlCLEdBQUcsYUFBQyxDQUFDLE1BQU0sQ0FBQztJQUNoRCxLQUFLLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRTtJQUNqQixLQUFLLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sRUFBRSxhQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEMsUUFBUSxFQUFFLGFBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDL0IsY0FBYyxFQUFFLGFBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUNqRCxhQUFhLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Q0FDNUQsQ0FBQyxDQUFBO0FBTUssS0FBSyxVQUFVLEdBQUcsQ0FDdkIsR0FBa0QsRUFDbEQsR0FBeUM7SUFFekMsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQTtJQUM1RixNQUFNLGtCQUFrQixHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBRXBGLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDckUsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtRQUM3QixPQUFPLE1BQU0sa0JBQWtCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7WUFDdEQsUUFBUTtZQUNSLGlCQUFpQixFQUFFO2dCQUNqQixLQUFLO2dCQUNMLE1BQU07YUFDUDtZQUNELGNBQWM7WUFDZCxhQUFhO1NBQ2QsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQTtJQUVELGlDQUFpQztJQUNqQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUNsQyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNkLE9BQU87WUFDTCxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ25DLGtCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGtCQUFrQixJQUFJLENBQUMsQ0FBQztZQUNwRixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDekUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLDhDQUE4QztZQUM5QyxHQUFHLENBQUMsY0FBYyxJQUFJO2dCQUNwQixZQUFZLEVBQUUsSUFBSTtnQkFDbEIsYUFBYTthQUNkLENBQUM7U0FDSCxDQUFBO0lBQ0gsQ0FBQyxFQUNELEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUNoRSxDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUN6QixDQUFDIn0=