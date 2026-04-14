"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTypeDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_type_1 = require("../workflows/delete-type");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchTypeDeleteHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, delete_type_1.deleteTypeWorkflow)(container).run({
            input: { id: data.id },
        });
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}
exports.config = {
    event: [
        // Workflow events
        'product-type.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_TYPE_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdHlwZS1kZWxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtdHlwZS1kZWxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsK0NBZ0JDO0FBcEJELDJDQUErQztBQUMvQywwREFBNkQ7QUFDN0QsZ0VBQXFGO0FBRXRFLEtBQUssVUFBVSw0QkFBNEIsQ0FBQyxFQUN6RCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLElBQUksQ0FBQyxJQUFBLHdDQUFxQixFQUFDLFNBQVMsRUFBRSxxQ0FBa0IsQ0FBQztRQUFFLE9BQU07SUFFakUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsZ0NBQWtCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3RDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsb0JBQW9CO0tBQ25DO0NBQ0YsQ0FBQSJ9