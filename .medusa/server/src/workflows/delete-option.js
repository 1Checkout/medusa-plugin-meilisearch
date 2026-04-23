"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOptionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_option_1 = require("./steps/delete-option");
exports.deleteOptionWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-option', ({ id }) => {
    const { products } = (0, delete_option_1.deleteOptionStep)({ optionId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvZGVsZXRlLW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUseURBQXdEO0FBTTNDLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSw4QkFBYyxFQUFDLDJCQUEyQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUN4RyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSxnQ0FBZ0IsRUFBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==