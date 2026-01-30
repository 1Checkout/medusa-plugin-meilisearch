"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariantWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_variant_1 = require("./steps/delete-variant");
exports.deleteVariantWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-variant', ({ id }) => {
    const { products } = (0, delete_variant_1.deleteVariantStep)({ variantId: id });
    return new workflows_sdk_1.WorkflowResponse({
        products,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXZhcmlhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2RlbGV0ZS12YXJpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSwyREFBMEQ7QUFNN0MsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDhCQUFjLEVBQUMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQzFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLGtDQUFpQixFQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFFekQsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLFFBQVE7S0FDVCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9