"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProductsWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const sync_products_1 = require("./steps/sync-products");
exports.syncProductsWorkflow = (0, workflows_sdk_1.createWorkflow)('sync-products', ({ filters, batchSize }) => {
    const { totalProcessed, totalDeleted } = (0, sync_products_1.syncProductsStep)({ filters, batchSize });
    return new workflows_sdk_1.WorkflowResponse({
        totalProcessed,
        totalDeleted,
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1wcm9kdWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3Mvc3luYy1wcm9kdWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUseURBQXdEO0FBUTNDLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSw4QkFBYyxFQUNoRCxlQUFlLEVBQ2YsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQTZCLEVBQUUsRUFBRTtJQUNwRCxNQUFNLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUEsZ0NBQWdCLEVBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtJQUNqRixPQUFPLElBQUksZ0NBQWdCLENBQUM7UUFDMUIsY0FBYztRQUNkLFlBQVk7S0FDYixDQUFDLENBQUE7QUFDSixDQUFDLENBQ0YsQ0FBQSJ9