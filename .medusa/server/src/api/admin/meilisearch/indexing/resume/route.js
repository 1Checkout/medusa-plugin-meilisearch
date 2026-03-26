"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const meilisearch_1 = require("../../../../../modules/meilisearch");
async function POST(req, res) {
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    meilisearchService.resumeIndexing();
    res.json({
        paused: false,
        message: 'Real-time indexing has been resumed. Events will be processed normally.',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL2luZGV4aW5nL3Jlc3VtZS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVFBLG9CQU9DO0FBZEQsb0VBQTJGO0FBT3BGLEtBQUssVUFBVSxJQUFJLENBQUMsR0FBa0IsRUFBRSxHQUFnRDtJQUM3RixNQUFNLGtCQUFrQixHQUF1QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQ0FBa0IsQ0FBQyxDQUFBO0lBQ3BGLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxNQUFNLEVBQUUsS0FBSztRQUNiLE9BQU8sRUFBRSx5RUFBeUU7S0FDbkYsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9