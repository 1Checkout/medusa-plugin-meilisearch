"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = meilisearchTypeDeleteHandler;
const utils_1 = require("@medusajs/utils");
const delete_type_1 = require("../workflows/delete-type");
async function meilisearchTypeDeleteHandler({ container, event: { data }, }) {
    const logger = container.resolve('logger');
    try {
        await (0, delete_type_1.deleteTypeWorkflow)(container).run({
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
        'product-type.deleted',
        // Module events
        utils_1.ProductEvents.PRODUCT_TYPE_DELETED,
    ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVpbGlzZWFyY2gtdHlwZS1kZWxldGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvbWVpbGlzZWFyY2gtdHlwZS1kZWxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsK0NBY0M7QUFqQkQsMkNBQStDO0FBQy9DLDBEQUE2RDtBQUU5QyxLQUFLLFVBQVUsNEJBQTRCLENBQUMsRUFDekQsU0FBUyxFQUNULEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUNnQjtJQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sSUFBQSxnQ0FBa0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDdEMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFO1FBQ0wsa0JBQWtCO1FBQ2xCLHNCQUFzQjtRQUN0QixnQkFBZ0I7UUFDaEIscUJBQWEsQ0FBQyxvQkFBb0I7S0FDbkM7Q0FDRixDQUFBIn0=