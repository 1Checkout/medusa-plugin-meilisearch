"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionValueUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_option_value_1 = require("../workflows/upsert-option-value");
const utils_2 = require("./utils");
async function meilisearchOptionValueUpsertHandler({ container, event: { data }, }) {
    if (!(0, utils_2.isSubscriptionEnabled)(container, utils_2.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_option_value_1.upsertOptionValueWorkflow)(container).run({
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
        'product-option-value.created',
        'product-option-value.updated',
        // Module events
        utils_1.ProductEvents.PRODUCT_OPTION_VALUE_CREATED,
        utils_1.ProductEvents.PRODUCT_OPTION_VALUE_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXZhbHVlLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdmFsdWUtdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHNEQWdCQztBQXBCRCwyQ0FBK0M7QUFDL0MsMEVBQTRFO0FBQzVFLG1DQUFtRTtBQUVwRCxLQUFLLFVBQVUsbUNBQW1DLENBQUMsRUFDaEUsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSw2QkFBcUIsRUFBQyxTQUFTLEVBQUUsMEJBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLCtDQUF5QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM3QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIsOEJBQThCO1FBQzlCLDhCQUE4QjtRQUM5QixnQkFBZ0I7UUFDaEIscUJBQWEsQ0FBQyw0QkFBNEI7UUFDMUMscUJBQWEsQ0FBQyw0QkFBNEI7S0FDM0M7Q0FDRixDQUFBIn0=