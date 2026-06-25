"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTagUpsertHandler;
const upsert_tag_1 = require("../workflows/upsert-tag");
async function meilisearchTagUpsertHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, upsert_tag_1.upsertTagWorkflow)(container).run({
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
    // 'product-tag.created',
    // 'product-tag.updated',
    // 'product-tag.attached',
    // 'product-tag.detached',
    // Module events
    // ProductEvents.PRODUCT_TAG_CREATED,
    // ProductEvents.PRODUCT_TAG_UPDATED,
    // ProductEvents.PRODUCT_TAG_ATTACHED,
    // ProductEvents.PRODUCT_TAG_DETACHED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdGFnLXVwc2VydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9tZWlsaXNlYXJjaC10YWctdXBzZXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLDhDQWNDO0FBaEJELHdEQUEyRDtBQUU1QyxLQUFLLFVBQVUsMkJBQTJCLENBQUMsRUFDeEQsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSw4QkFBaUIsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDckMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO0lBQ0wsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixnQkFBZ0I7SUFDaEIscUNBQXFDO0lBQ3JDLHFDQUFxQztJQUNyQyxzQ0FBc0M7SUFDdEMsc0NBQXNDO0tBQ3ZDO0NBQ0YsQ0FBQSJ9