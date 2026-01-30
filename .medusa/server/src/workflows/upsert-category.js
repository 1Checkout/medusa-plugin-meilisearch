"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCategoryWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_category_1 = require("./steps/upsert-category");
exports.upsertCategoryWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-category', ({ id }) => {
    const result = (0, upsert_category_1.upsertCategoryStep)({ categoryId: id });
    return new workflows_sdk_1.WorkflowResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LWNhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy91cHNlcnQtY2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLDZEQUE0RDtBQU0vQyxRQUFBLHNCQUFzQixHQUFHLElBQUEsOEJBQWMsRUFBQyw2QkFBNkIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFpQixFQUFFLEVBQUU7SUFDNUcsTUFBTSxNQUFNLEdBQUcsSUFBQSxvQ0FBa0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUMsQ0FBQSJ9