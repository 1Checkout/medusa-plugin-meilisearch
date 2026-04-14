"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchPriceUpsertHandler;
const utils_1 = require("@medusajs/utils");
const upsert_price_1 = require("../workflows/upsert-price");
const subscriber_utils_1 = require("../utils/subscriber-utils");
async function meilisearchPriceUpsertHandler({ container, event: { data }, }) {
    if (!(0, subscriber_utils_1.isSubscriptionEnabled)(container, subscriber_utils_1.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, upsert_price_1.upsertPriceWorkflow)(container).run({
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
        'price.created',
        'price.updated',
        // Module events
        utils_1.PricingEvents.PRICE_CREATED,
        utils_1.PricingEvents.PRICE_UPDATED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJpY2UtdXBzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLXByaWNlLXVwc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxnREFnQkM7QUFwQkQsMkNBQStDO0FBQy9DLDREQUErRDtBQUMvRCxnRUFBcUY7QUFFdEUsS0FBSyxVQUFVLDZCQUE2QixDQUFDLEVBQzFELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsSUFBSSxDQUFDLElBQUEsd0NBQXFCLEVBQUMsU0FBUyxFQUFFLHFDQUFrQixDQUFDO1FBQUUsT0FBTTtJQUVqRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSxrQ0FBbUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdkMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHFCQUFhLENBQUMsYUFBYTtRQUMzQixxQkFBYSxDQUFDLGFBQWE7S0FDNUI7Q0FDRixDQUFBIn0=