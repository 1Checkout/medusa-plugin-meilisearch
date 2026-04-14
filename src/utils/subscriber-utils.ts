import { Modules, SearchUtils } from '@medusajs/utils'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../modules/meilisearch'
import { setCacheRef } from '../modules/meilisearch/services/meilisearch'

export const PRODUCT_INDEX_TYPE = SearchUtils.indexTypes.PRODUCTS
export const CATEGORY_INDEX_TYPE = 'categories'

const PAUSE_CACHE_KEY = 'meilisearch:indexing:paused'

export async function isSubscriptionEnabled(container: any, type: string): Promise<boolean> {
  try {
    // Capture the cache reference for the service-level guard
    const cache = container.resolve(Modules.CACHE)
    setCacheRef(cache)

    // Check if paused via cache
    const paused = await cache.get(PAUSE_CACHE_KEY)
    if (paused === true) return false

    // Check static config
    const meilisearchService: MeiliSearchService = container.resolve(MEILISEARCH_MODULE)
    return meilisearchService.isSubscriptionEnabledForType(type)
  } catch {
    return true
  }
}
