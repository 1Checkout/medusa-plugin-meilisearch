"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const meilisearch_1 = require("../../../../modules/meilisearch");
async function GET(req, res) {
    const meilisearchService = req.scope.resolve(meilisearch_1.MEILISEARCH_MODULE);
    // Use the new method to get vector search status
    const status = await meilisearchService.getVectorSearchStatus();
    res.json(status);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL3ZlY3Rvci1zdGF0dXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFZQSxrQkFPQztBQWxCRCxpRUFBd0Y7QUFXakYsS0FBSyxVQUFVLEdBQUcsQ0FBQyxHQUFrQixFQUFFLEdBQThDO0lBQzFGLE1BQU0sa0JBQWtCLEdBQXVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFFcEYsaURBQWlEO0lBQ2pELE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsQ0FBQTtJQUUvRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2xCLENBQUMifQ==