"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const meilisearch_1 = require("../../../../../modules/meilisearch");
async function POST(req, res) {
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    meilisearchService.pauseIndexing();
    res.json({
        paused: true,
        message: 'Real-time indexing has been paused. Events will be silently skipped until resumed.',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL2luZGV4aW5nL3BhdXNlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBUUEsb0JBT0M7QUFkRCxvRUFBMkY7QUFPcEYsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFrQixFQUFFLEdBQStDO0lBQzVGLE1BQU0sa0JBQWtCLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFDcEYsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE1BQU0sRUFBRSxJQUFJO1FBQ1osT0FBTyxFQUFFLG9GQUFvRjtLQUM5RixDQUFDLENBQUE7QUFDSixDQUFDIn0=