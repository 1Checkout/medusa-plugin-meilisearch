"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTagDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_tag_1 = require("../workflows/delete-tag");
async function meilisearchTagDeleteHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, delete_tag_1.deleteTagWorkflow)(container).run({
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
        'product-tag.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_TAG_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdGFnLWRlbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC10YWctZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDhDQWNDO0FBakJELDJDQUErQztBQUMvQyx3REFBMkQ7QUFFNUMsS0FBSyxVQUFVLDJCQUEyQixDQUFDLEVBQ3hELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxQyxJQUFJLENBQUM7UUFDSCxNQUFNLElBQUEsOEJBQWlCLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ3JDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1NBQ3ZCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixNQUFNLEtBQUssQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRTtRQUNMLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsbUJBQW1CO0tBQ2xDO0NBQ0YsQ0FBQSJ9