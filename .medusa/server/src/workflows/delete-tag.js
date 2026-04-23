"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_tag_1 = require("./steps/delete-tag");
exports.deleteTagWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-tag', ({ id }) => {
    const { products } = (0, delete_tag_1.deleteTagStep)({ tagId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXRhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvZGVsZXRlLXRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEU7QUFDMUUsbURBQWtEO0FBTXJDLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSw4QkFBYyxFQUFDLHdCQUF3QixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQWlCLEVBQUUsRUFBRTtJQUNsRyxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBQSwwQkFBYSxFQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDakQsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUMsQ0FBQSJ9