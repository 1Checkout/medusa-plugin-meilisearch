"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const meilisearch_1 = require("../../../../modules/meilisearch");
async function GET(req, res) {
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    res.json({
        paused: meilisearchService.isIndexingPaused(),
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL2luZGV4aW5nL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBT0Esa0JBS0M7QUFYRCxpRUFBd0Y7QUFNakYsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQWdEO0lBQzVGLE1BQU0sa0JBQWtCLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFDcEYsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRTtLQUM5QyxDQUFDLENBQUE7QUFDSixDQUFDIn0=