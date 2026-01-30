"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertPriceWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_price_1 = require("./steps/upsert-price");
exports.upsertPriceWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-price', ({ id }) => {
    const { products } = (0, upsert_price_1.upsertPriceStep)({ priceId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXByaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy91cHNlcnQtcHJpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLHVEQUFzRDtBQU16QyxRQUFBLG1CQUFtQixHQUFHLElBQUEsOEJBQWMsRUFBQywwQkFBMEIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFpQixFQUFFLEVBQUU7SUFDdEcsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUEsOEJBQWUsRUFBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRXJELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==