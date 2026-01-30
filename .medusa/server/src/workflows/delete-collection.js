"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollectionWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const delete_collection_1 = require("./steps/delete-collection");
exports.deleteCollectionWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-delete-collection', ({ id }) => {
    const { products } = (0, delete_collection_1.deleteCollectionStep)({ collectionId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWNvbGxlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2RlbGV0ZS1jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUEwRTtBQUMxRSxpRUFBZ0U7QUFNbkQsUUFBQSx3QkFBd0IsR0FBRyxJQUFBLDhCQUFjLEVBQUMsK0JBQStCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBaUIsRUFBRSxFQUFFO0lBQ2hILE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLHdDQUFvQixFQUFDLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0QsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUMsQ0FBQSJ9