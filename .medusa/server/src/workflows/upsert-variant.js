"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertVariantWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_variant_1 = require("./steps/upsert-variant");
exports.upsertVariantWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-variant', ({ id }) => {
    const { products } = (0, upsert_variant_1.upsertVariantStep)({ variantId: id });
    return new workflows_sdk_1.WorkflowResponse({
        products,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXZhcmlhbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Vwc2VydC12YXJpYW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSwyREFBMEQ7QUFNN0MsUUFBQSxxQkFBcUIsR0FBRyxJQUFBLDhCQUFjLEVBQUMsNEJBQTRCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQzFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLGtDQUFpQixFQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekQsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLFFBQVE7S0FDVCxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSJ9