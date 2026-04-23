"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_inventory_1 = require("./steps/delete-inventory");
exports.deleteInventoryWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-inventory', ({ id }) => {
    const { products } = (0, delete_inventory_1.deleteInventoryStep)({ inventoryItemId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWludmVudG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvZGVsZXRlLWludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUsK0RBQThEO0FBTWpELFFBQUEsdUJBQXVCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLDhCQUE4QixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUM5RyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSxzQ0FBbUIsRUFBQyxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==