"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryLevelWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_inventory_level_1 = require("./steps/delete-inventory-level");
exports.deleteInventoryLevelWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-inventory-level', ({ id }) => {
    const { products } = (0, delete_inventory_level_1.deleteInventoryLevelStep)({ inventoryLevelId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWludmVudG9yeS1sZXZlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvZGVsZXRlLWludmVudG9yeS1sZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUsMkVBQXlFO0FBTTVELFFBQUEsNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUN4RCxvQ0FBb0MsRUFDcEMsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQ3hCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLGlEQUF3QixFQUFDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RSxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FDRixDQUFBIn0=