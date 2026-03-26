"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_INDEX_TYPE = exports.PRODUCT_INDEX_TYPE = void 0;
exports.isSubscriptionEnabled = isSubscriptionEnabled;
const utils_1 = require("@medusajs/utils");
const meilisearch_1 = require("../modules/meilisearch");
exports.PRODUCT_INDEX_TYPE = utils_1.SearchUtils.indexTypes.PRODUCTS;
exports.CATEGORY_INDEX_TYPE = 'categories';
function isSubscriptionEnabled(container, type) {
    try {
        const meilisearchService = container.resolve(meilisearch_1.MEILISEARCH_MODULE);
        return meilisearchService.isSubscriptionEnabledForType(type);
    }
    catch {
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTUEsc0RBT0M7QUFiRCwyQ0FBNkM7QUFDN0Msd0RBQStFO0FBRWxFLFFBQUEsa0JBQWtCLEdBQUcsbUJBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFBO0FBQ3BELFFBQUEsbUJBQW1CLEdBQUcsWUFBWSxDQUFBO0FBRS9DLFNBQWdCLHFCQUFxQixDQUFDLFNBQWMsRUFBRSxJQUFZO0lBQ2hFLElBQUksQ0FBQztRQUNILE1BQU0sa0JBQWtCLEdBQXVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0NBQWtCLENBQUMsQ0FBQTtRQUNwRixPQUFPLGtCQUFrQixDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7QUFDSCxDQUFDIn0=