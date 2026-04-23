import { asValue } from 'awilix'
import { LoaderOptions } from '@medusajs/types'
import { Modules } from '@medusajs/utils'
import { MeiliSearchService, setCacheRef } from '../services/meilisearch'
import { MeilisearchPluginOptions } from '../types'

export default async ({ container, options }: LoaderOptions<MeilisearchPluginOptions>): Promise<void> => {
  if (!options) {
    throw new Error('Missing meilisearch configuration')
  }

  const meilisearchService: MeiliSearchService = new MeiliSearchService(container, options)
  const { settings } = options

  container.register({
    meilisearchService: asValue(meilisearchService),
  })

  // Eagerly capture the cache reference so the service-level pause guard
  // works on every process, even before any subscriber or API route has
  // fired. Without this, call paths that invoke addDocuments/deleteDocument
  // before the first subscriber would bypass the pause flag.
  try {
    const cache = container.resolve(Modules.CACHE)
    if (cache) {
      setCacheRef(cache)
    }
  } catch {
    // Cache module not available in this context; subscriber-utils will
    // capture it lazily on the first event.
  }

  await Promise.all(
    Object.entries(settings || {}).map(async ([indexName, value]) => {
      return await meilisearchService.updateSettings(indexName, value)
    }),
  )
}
