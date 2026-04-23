"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_product_1 = require("./steps/delete-product");
exports.deleteProductWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-product', ({ id }) => {
    (0, delete_product_1.deleteProductStep)({ productId: id });
    return new workflows_sdk_1.WorkflowResponse({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2RlbGV0ZS1wcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSwyREFBMEQ7QUFNN0MsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDhCQUFjLEVBQUMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQzFHLElBQUEsa0NBQWlCLEVBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUVwQyxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFDLENBQUEifQ==