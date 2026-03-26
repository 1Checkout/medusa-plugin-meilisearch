"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchInventoryLevelDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_inventory_level_1 = require("../workflows/delete-inventory-level");
const utils_2 = require("./utils");
async function meilisearchInventoryLevelDeleteHandler({ container, event: { data }, }) {
    if (!(0, utils_2.isSubscriptionEnabled)(container, utils_2.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, delete_inventory_level_1.deleteInventoryLevelWorkflow)(container).run({
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
        'inventory-level.deleted',
        // Module events
        utils_1.InventoryEvents.INVENTORY_LEVEL_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtaW52ZW50b3J5LWxldmVsLWRlbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1pbnZlbnRvcnktbGV2ZWwtZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHlEQWdCQztBQXBCRCwyQ0FBaUQ7QUFDakQsZ0ZBQWtGO0FBQ2xGLG1DQUFtRTtBQUVwRCxLQUFLLFVBQVUsc0NBQXNDLENBQUMsRUFDbkUsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSw2QkFBcUIsRUFBQyxTQUFTLEVBQUUsMEJBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLHFEQUE0QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoRCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLGdCQUFnQjtRQUNoQix1QkFBZSxDQUFDLHVCQUF1QjtLQUN4QztDQUNGLENBQUEifQ==