"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertTagWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_tag_1 = require("./steps/upsert-tag");
exports.upsertTagWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-tag', ({ id }) => {
    const { products } = (0, upsert_tag_1.upsertTagStep)({ tagId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LXRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvdXBzZXJ0LXRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUsbURBQWtEO0FBTXJDLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUNsRyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDakQsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUMsQ0FBQSJ9