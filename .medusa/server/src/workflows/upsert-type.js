"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertTypeWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_type_1 = require("./steps/upsert-type");
exports.upsertTypeWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-type', ({ id }) => {
    const { products } = (0, upsert_type_1.upsertTypeStep)({ typeId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Vwc2VydC10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSxxREFBb0Q7QUFNdkMsUUFBQSxrQkFBa0IsR0FBRyxJQUFBLDhCQUFjLEVBQUMseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQ3BHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLDRCQUFjLEVBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNuRCxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQyxDQUFBIn0=