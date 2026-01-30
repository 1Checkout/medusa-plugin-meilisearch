"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePriceWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_price_1 = require("./steps/delete-price");
exports.deletePriceWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-price', ({ id }) => {
    const { products } = (0, delete_price_1.deletePriceStep)({ priceId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXByaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9kZWxldGUtcHJpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLHVEQUFzRDtBQU16QyxRQUFBLG1CQUFtQixHQUFHLElBQUEsOEJBQWMsRUFBQywwQkFBMEIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFpQixFQUFFLEVBQUU7SUFDdEcsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUEsOEJBQWUsRUFBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==