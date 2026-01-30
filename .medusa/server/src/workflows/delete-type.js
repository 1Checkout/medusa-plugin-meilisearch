"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTypeWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_type_1 = require("./steps/delete-type");
exports.deleteTypeWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-type', ({ id }) => {
    const { products } = (0, delete_type_1.deleteTypeStep)({ typeId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2RlbGV0ZS10eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSxxREFBb0Q7QUFNdkMsUUFBQSxrQkFBa0IsR0FBRyxJQUFBLDhCQUFjLEVBQUMseUJBQXlCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQ3BHLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLDRCQUFjLEVBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUNuRCxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQyxDQUFBIn0=