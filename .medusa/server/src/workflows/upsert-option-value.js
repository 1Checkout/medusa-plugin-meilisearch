"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertOptionValueWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_option_value_1 = require("./steps/upsert-option-value");
exports.upsertOptionValueWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-option-value', ({ id }) => {
    const { products } = (0, upsert_option_value_1.upsertOptionValueStep)({ optionValueId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LW9wdGlvbi12YWx1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvdXBzZXJ0LW9wdGlvbi12YWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUscUVBQW1FO0FBTXRELFFBQUEseUJBQXlCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLGlDQUFpQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUNuSCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSwyQ0FBcUIsRUFBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ2pFLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==