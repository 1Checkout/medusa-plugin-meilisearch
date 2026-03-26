"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionValueDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_option_value_1 = require("../workflows/delete-option-value");
const utils_2 = require("./utils");
async function meilisearchOptionValueDeleteHandler({ container, event: { data }, }) {
    if (!(0, utils_2.isSubscriptionEnabled)(container, utils_2.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, delete_option_value_1.deleteOptionValueWorkflow)(container).run({
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
        'product-option-value.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_OPTION_VALUE_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXZhbHVlLWRlbGV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdmFsdWUtZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLHNEQWdCQztBQXBCRCwyQ0FBK0M7QUFDL0MsMEVBQTRFO0FBQzVFLG1DQUFtRTtBQUVwRCxLQUFLLFVBQVUsbUNBQW1DLENBQUMsRUFDaEUsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixJQUFJLENBQUMsSUFBQSw2QkFBcUIsRUFBQyxTQUFTLEVBQUUsMEJBQWtCLENBQUM7UUFBRSxPQUFNO0lBRWpFLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLCtDQUF5QixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM3QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIsOEJBQThCO1FBQzlCLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLDRCQUE0QjtLQUMzQztDQUNGLENBQUEifQ==