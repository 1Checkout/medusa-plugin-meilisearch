"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchPriceDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_price_1 = require("../workflows/delete-price");
const utils_2 = require("./utils");
async function meilisearchPriceDeleteHandler({ container, event: { data }, }) {
    if (!(0, utils_2.isSubscriptionEnabled)(container, utils_2.PRODUCT_INDEX_TYPE))
        return;
    const logger = container.resolve('logger');
    try {
        await (0, delete_price_1.deletePriceWorkflow)(container).run({
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
        'price.deleted',
        // Module events
        utils_1.PricingEvents.PRICE_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJpY2UtZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLXByaWNlLWRlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFLQSxnREFnQkM7QUFwQkQsMkNBQStDO0FBQy9DLDREQUErRDtBQUMvRCxtQ0FBbUU7QUFFcEQsS0FBSyxVQUFVLDZCQUE2QixDQUFDLEVBQzFELFNBQVMsRUFDVCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FDZ0I7SUFDL0IsSUFBSSxDQUFDLElBQUEsNkJBQXFCLEVBQUMsU0FBUyxFQUFFLDBCQUFrQixDQUFDO1FBQUUsT0FBTTtJQUVqRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSxrQ0FBbUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdkMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIscUJBQWEsQ0FBQyxhQUFhO0tBQzVCO0NBQ0YsQ0FBQSJ9