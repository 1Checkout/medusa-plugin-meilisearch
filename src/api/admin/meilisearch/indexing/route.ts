import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { Modules } from '@medusajs/utils'
import { setCacheRef } from '../../../../modules/meilisearch/services/meilisearch'

const PAUSE_CACHE_KEY = 'meilisearch:indexing:paused'

export interface AdminIndexingStatusResponse {
  paused: boolean
}

export async function GET(req: MedusaRequest, res: MedusaResponse<AdminIndexingStatusResponse>) {
  const cache = req.scope.resolve(Modules.CACHE)
  setCacheRef(cache)
  const value = await cache.get(PAUSE_CACHE_KEY)
  res.json({
    paused: value === true,
  })
}
