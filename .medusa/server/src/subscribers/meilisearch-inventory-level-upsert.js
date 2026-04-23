"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchInventoryLevelUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_inventory_level_1 = require("../workflows/upsert-inventory-level");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchInventoryLevelUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_inventory_level_1.upsertInventoryLevelWorkflow)(container).run({
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
        'inventory-level.created',
        'inventory-level.updated',
        // Module events
        utils_1.InventoryEvents.INVENTORY_LEVEL_CREATED,
        utils_1.InventoryEvents.INVENTORY_LEVEL_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtaW52ZW50b3J5LWxldmVsLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1pbnZlbnRvcnktbGV2ZWwtdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHlEQWdCQztBQXBCRCwyQ0FBaUQ7QUFDakQsZ0ZBQWtGO0FBQ2xGLGdFQUFxRjtBQUV0RSxLQUFLLFVBQVUsc0NBQXNDLENBQUMsRUFDbkUsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSx3Q0FBcUIsRUFBQyxTQUFTLEVBQUUscUNBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLHFEQUE0QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoRCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixnQkFBZ0I7UUFDaEIsdUJBQWUsQ0FBQyx1QkFBdUI7UUFDdkMsdUJBQWUsQ0FBQyx1QkFBdUI7S0FDeEM7Q0FDRixDQUFBIn0=