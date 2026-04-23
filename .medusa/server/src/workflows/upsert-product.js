"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertProductWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_product_1 = require("./steps/upsert-product");
exports.upsertProductWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-product', ({ id }) => {
    const { products } = (0, upsert_product_1.upsertProductStep)({ productId: id });
    return new workflows_sdk_1.WorkflowResponse({
        products,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Vwc2VydC1wcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSwyREFBMEQ7QUFNN0MsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDhCQUFjLEVBQUMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQzFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLGtDQUFpQixFQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekQsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLFFBQVE7S0FDVCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9