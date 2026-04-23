"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertOptionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_option_1 = require("./steps/upsert-option");
exports.upsertOptionWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-option', ({ id }) => {
    const { products } = (0, upsert_option_1.upsertOptionStep)({ optionId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LW9wdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvdXBzZXJ0LW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUseURBQXdEO0FBTTNDLFFBQUEsb0JBQW9CLEdBQUcsSUFBQSw4QkFBYyxFQUFDLDJCQUEyQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUN4RyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSxnQ0FBZ0IsRUFBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3ZELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==