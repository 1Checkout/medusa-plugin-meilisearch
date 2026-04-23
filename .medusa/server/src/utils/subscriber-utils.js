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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Vic2NyaWJlci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9zdWJzY3JpYmVyLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLHNEQU9DO0FBYkQsMkNBQTZDO0FBQzdDLHdEQUErRTtBQUVsRSxRQUFBLGtCQUFrQixHQUFHLG1CQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQTtBQUNwRCxRQUFBLG1CQUFtQixHQUFHLFlBQVksQ0FBQTtBQUUvQyxTQUFnQixxQkFBcUIsQ0FBQyxTQUFjLEVBQUUsSUFBWTtJQUNoRSxJQUFJLENBQUM7UUFDSCxNQUFNLGtCQUFrQixHQUF1QixTQUFTLENBQUMsT0FBTyxDQUFDLGdDQUFrQixDQUFDLENBQUE7UUFDcEYsT0FBTyxrQkFBa0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0FBQ0gsQ0FBQyJ9