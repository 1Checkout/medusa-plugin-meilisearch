"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductStep = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../../modules/meilisearch");
exports.deleteProductStep = (0, workflows_sdk_1.createStep)('delete-product', async ({ productId }, { container }) => {
    const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
    const productIndexes = await meilisearchService.getIndexesByType(utils_1.SearchUtils.indexTypes.PRODUCTS);
    await Promise.all(productIndexes.map((indexKey) => meilisearchService.deleteDocument(indexKey, productId)));
    return new workflows_sdk_1.StepResponse({
        productId,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3N0ZXBzL2RlbGV0ZS1wcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUFrRTtBQUNsRSwyQ0FBNkM7QUFDN0MsMkRBQWtGO0FBTXJFLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSwwQkFBVSxFQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM5RyxNQUFNLGtCQUFrQixHQUF1QixTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7SUFDcEYsTUFBTSxjQUFjLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUVqRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFFM0csT0FBTyxJQUFJLDRCQUFZLENBQUM7UUFDdEIsU0FBUztLQUNWLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIn0=