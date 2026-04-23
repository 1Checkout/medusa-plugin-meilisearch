"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchCategoryDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_category_1 = require("../workflows/delete-category");
async function meilisearchCategoryDeleteHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, delete_category_1.deleteCategoryWorkflow)(container).run({
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
        'product-category.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_CATEGORY_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtY2F0ZWdvcnktZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL21laWxpc2VhcmNoLWNhdGVnb3J5LWRlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxtREFjQztBQWpCRCwyQ0FBK0M7QUFDL0Msa0VBQXFFO0FBRXRELEtBQUssVUFBVSxnQ0FBZ0MsQ0FBQyxFQUM3RCxTQUFTLEVBQ1QsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQ2dCO0lBQy9CLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUMsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFBLHdDQUFzQixFQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUMxQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsTUFBTSxLQUFLLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUU7UUFDTCxrQkFBa0I7UUFDbEIsMEJBQTBCO1FBQzFCLGdCQUFnQjtRQUNoQixxQkFBYSxDQUFDLHdCQUF3QjtLQUN2QztDQUNGLENBQUEifQ==