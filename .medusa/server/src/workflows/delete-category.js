"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_category_1 = require("./steps/delete-category");
exports.deleteCategoryWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-category', ({ id }) => {
    (0, delete_category_1.deleteCategoryStep)({ categoryId: id });
    return new workflows_sdk_1.WorkflowResponse({});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9kZWxldGUtY2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLDZEQUE0RDtBQU0vQyxRQUFBLHNCQUFzQixHQUFHLElBQUEsOEJBQWMsRUFBQyw2QkFBNkIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFpQixFQUFFLEVBQUU7SUFDNUcsSUFBQSxvQ0FBa0IsRUFBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQUMsQ0FBQSJ9