"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchPriceDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_price_1 = require("../workflows/delete-price");
async function meilisearchPriceDeleteHandler({ container, event: { data }, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtcHJpY2UtZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLXByaWNlLWRlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxnREFjQztBQWpCRCwyQ0FBK0M7QUFDL0MsNERBQStEO0FBRWhELEtBQUssVUFBVSw2QkFBNkIsQ0FBQyxFQUMxRCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLGtDQUFtQixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUN2QyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLGFBQWE7S0FDNUI7Q0FDRixDQUFBIn0=