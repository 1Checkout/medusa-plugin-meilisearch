"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCollectionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_collection_1 = require("./steps/upsert-collection");
exports.upsertCollectionWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-collection', ({ id }) => {
    const { products } = (0, upsert_collection_1.upsertCollectionStep)({ collectionId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LWNvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL3Vwc2VydC1jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSxpRUFBZ0U7QUFNbkQsUUFBQSx3QkFBd0IsR0FBRyxJQUFBLDhCQUFjLEVBQUMsK0JBQStCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQ2hILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLHdDQUFvQixFQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0QsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUMsQ0FBQSJ9