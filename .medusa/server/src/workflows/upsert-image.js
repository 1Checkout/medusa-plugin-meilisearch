"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertImageWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/workflows-sdk");
const upsert_image_1 = require("./steps/upsert-image");
exports.upsertImageWorkflow = (0, workflows_sdk_1.createWorkflow)('meilisearch-upsert-image', ({ id }) => {
    const { products } = (0, upsert_image_1.upsertImageStep)({ imageId: id });
    return new workflows_sdk_1.WorkflowResponse({ products });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBzZXJ0LWltYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy91cHNlcnQtaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQTBFO0FBQzFFLHVEQUFzRDtBQU16QyxRQUFBLG1CQUFtQixHQUFHLElBQUEsOEJBQWMsRUFBQywwQkFBMEIsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFpQixFQUFFLEVBQUU7SUFDdEcsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUEsOEJBQWUsRUFBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFDLENBQUEifQ==