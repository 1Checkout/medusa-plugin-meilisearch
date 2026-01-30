"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSearchCategoriesSchema = void 0;
exports.GET = GET;
const zod_1 = __importDefault(require("zod"));
const meilisearch_1 = require("../../../../modules/meilisearch");
exports.StoreSearchCategoriesSchema = zod_1.default.object({
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
    const indexes = await meilisearchService.getIndexesByType('categories');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL3N0b3JlL21laWxpc2VhcmNoL2NhdGVnb3JpZXMtaGl0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFrQkEsa0JBeUNDO0FBM0RELDhDQUFtQjtBQUduQixpRUFBd0Y7QUFFM0UsUUFBQSwyQkFBMkIsR0FBRyxhQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2xELEtBQUssRUFBRSxhQUFDLENBQUMsTUFBTSxFQUFFO0lBQ2pCLEtBQUssRUFBRSxhQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEMsTUFBTSxFQUFFLGFBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwQyxRQUFRLEVBQUUsYUFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQixjQUFjLEVBQUUsYUFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2pELGFBQWEsRUFBRSxhQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztDQUM1RCxDQUFDLENBQUE7QUFNSyxLQUFLLFVBQVUsR0FBRyxDQUN2QixHQUFvRCxFQUNwRCxHQUEyQztJQUUzQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFBO0lBQzVGLE1BQU0sa0JBQWtCLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQzdCLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUN0RCxRQUFRO1lBQ1IsaUJBQWlCLEVBQUU7Z0JBQ2pCLEtBQUs7Z0JBQ0wsTUFBTTthQUNQO1lBQ0QsY0FBYztZQUNkLGFBQWE7U0FDZCxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFBO0lBRUQsaUNBQWlDO0lBQ2pDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQ2xDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2QsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbkMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDO1lBQ3BGLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6RSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsOENBQThDO1lBQzlDLEdBQUcsQ0FBQyxjQUFjLElBQUk7Z0JBQ3BCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixhQUFhO2FBQ2QsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDLEVBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQ2hFLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ3pCLENBQUMifQ==