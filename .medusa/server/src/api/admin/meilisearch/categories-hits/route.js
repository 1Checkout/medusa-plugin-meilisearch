"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSearchCategoriesSchema = void 0;
exports.POST = POST;
const zod_1 = require("zod");
const meilisearch_1 = require("../../../../modules/meilisearch");
exports.AdminSearchCategoriesSchema = zod_1.z.object({
    query: zod_1.z.string(),
    limit: zod_1.z.coerce.number().default(10),
    offset: zod_1.z.coerce.number().default(0),
    language: zod_1.z.string().optional(),
    semanticSearch: zod_1.z.coerce.boolean().default(false),
    semanticRatio: zod_1.z.coerce.number().min(0).max(1).default(0.5),
});
async function POST(req, res) {
    const { query, language, limit, offset, semanticSearch, semanticRatio } = req.validatedBody;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL2NhdGVnb3JpZXMtaGl0cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFrQkEsb0JBeUNDO0FBM0RELDZCQUF1QjtBQUd2QixpRUFBd0Y7QUFFM0UsUUFBQSwyQkFBMkIsR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2xELEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxFQUFFO0lBQ2pCLEtBQUssRUFBRSxPQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEMsTUFBTSxFQUFFLE9BQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwQyxRQUFRLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQixjQUFjLEVBQUUsT0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2pELGFBQWEsRUFBRSxPQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztDQUM1RCxDQUFDLENBQUE7QUFNSyxLQUFLLFVBQVUsSUFBSSxDQUN4QixHQUFvRCxFQUNwRCxHQUFnRDtJQUVoRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFBO0lBQzNGLE1BQU0sa0JBQWtCLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN2RSxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFO1FBQzdCLE9BQU8sTUFBTSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtZQUN0RCxRQUFRO1lBQ1IsaUJBQWlCLEVBQUU7Z0JBQ2pCLEtBQUs7Z0JBQ0wsTUFBTTthQUNQO1lBQ0QsY0FBYztZQUNkLGFBQWE7U0FDZCxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFBO0lBRUQsaUNBQWlDO0lBQ2pDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQ2xDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2QsT0FBTztZQUNMLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbkMsa0JBQWtCLEVBQUUsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLElBQUksQ0FBQyxDQUFDO1lBQ3BGLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6RSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7WUFDbkIsOENBQThDO1lBQzlDLEdBQUcsQ0FBQyxjQUFjLElBQUk7Z0JBQ3BCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixhQUFhO2FBQ2QsQ0FBQztTQUNILENBQUE7SUFDSCxDQUFDLEVBQ0QsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQ2hFLENBQUE7SUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ3pCLENBQUMifQ==