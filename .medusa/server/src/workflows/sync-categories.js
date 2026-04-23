"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCategoriesWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const sync_categories_1 = require("./steps/sync-categories");
exports.syncCategoriesWorkflow = (0, workflows_sdk_1.createWorkflow)('sync-categories', ({ filters, batchSize }) => {
    const { totalProcessed, totalDeleted } = (0, sync_categories_1.syncCategoriesStep)({ filters, batchSize });
    return new workflows_sdk_1.WorkflowResponse({
        totalProcessed,
        totalDeleted,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1jYXRlZ29yaWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9zeW5jLWNhdGVnb3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLDZEQUE0RDtBQVEvQyxRQUFBLHNCQUFzQixHQUFHLElBQUEsOEJBQWMsRUFDbEQsaUJBQWlCLEVBQ2pCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUErQixFQUFFLEVBQUU7SUFDdEQsTUFBTSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFBLG9DQUFrQixFQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUE7SUFDbkYsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLGNBQWM7UUFDZCxZQUFZO0tBQ2IsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUNGLENBQUEifQ==