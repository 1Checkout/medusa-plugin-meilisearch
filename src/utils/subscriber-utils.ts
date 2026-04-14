import { SearchUtils } from '@medusajs/utils'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../modules/meilisearch'

export const PRODUCT_INDEX_TYPE = SearchUtils.indexTypes.PRODUCTS
export const CATEGORY_INDEX_TYPE = 'categories'

export function isSubscriptionEnabled(container: any, type: string): boolean {
  try {
    const meilisearchService: MeiliSearchService = container.resolve(MEILISEARCH_MODULE)
    return meilisearchService.isSubscriptionEnabledForType(type)
  } catch {
    return true
  }
}
