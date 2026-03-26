"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchInventoryUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_inventory_1 = require("../workflows/upsert-inventory");
const utils_2 = require("./utils");
async function meilisearchInventoryUpsertHandler({ container, event: { data }, }) {
    if (!(0, utils_2.isSubscriptionEnabled)(container, utils_2.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_inventory_1.upsertInventoryWorkflow)(container).run({
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
        'inventory-item.created',
        'inventory-item.updated',
        // Module events
        utils_1.InventoryEvents.INVENTORY_ITEM_CREATED,
        utils_1.InventoryEvents.INVENTORY_ITEM_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtaW52ZW50b3J5LXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1pbnZlbnRvcnktdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLG9EQWdCQztBQXBCRCwyQ0FBaUQ7QUFDakQsb0VBQXVFO0FBQ3ZFLG1DQUFtRTtBQUVwRCxLQUFLLFVBQVUsaUNBQWlDLENBQUMsRUFDOUQsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSw2QkFBcUIsRUFBQyxTQUFTLEVBQUUsMEJBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLDBDQUF1QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMzQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixnQkFBZ0I7UUFDaEIsdUJBQWUsQ0FBQyxzQkFBc0I7UUFDdEMsdUJBQWUsQ0FBQyxzQkFBc0I7S0FDdkM7Q0FDRixDQUFBIn0=