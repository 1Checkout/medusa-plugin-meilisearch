"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchOptionValueUpsertHandler;
const upsert_option_value_1 = require("../workflows/upsert-option-value");
async function meilisearchOptionValueUpsertHandler({ container, event: { data }, }) {
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
    // Creation indexing disabled (see meilisearch-product-upsert): option values
    // are created in bulk with their product, so creation indexing is handled by
    // the post-import batched sync. Only UPDATE events index live.
    // Workflow events
    // 'product-option-value.created',
    // 'product-option-value.updated',
    // Module events
    // ProductEvents.PRODUCT_OPTION_VALUE_CREATED,
    // ProductEvents.PRODUCT_OPTION_VALUE_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtb3B0aW9uLXZhbHVlLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC1vcHRpb24tdmFsdWUtdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHNEQWNDO0FBaEJELDBFQUE0RTtBQUU3RCxLQUFLLFVBQVUsbUNBQW1DLENBQUMsRUFDaEUsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSwrQ0FBeUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDN0MsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO0lBQ0wsNkVBQTZFO0lBQzdFLDZFQUE2RTtJQUM3RSwrREFBK0Q7SUFDL0Qsa0JBQWtCO0lBQ2xCLGtDQUFrQztJQUNsQyxrQ0FBa0M7SUFDbEMsZ0JBQWdCO0lBQ2hCLDhDQUE4QztJQUM5Qyw4Q0FBOEM7S0FDL0M7Q0FDRixDQUFBIn0=