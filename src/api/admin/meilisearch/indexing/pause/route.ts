import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { Modules } from '@medusajs/utils'
import { setCacheRef } from '../../../../../modules/meilisearch/services/meilisearch'

const PAUSE_CACHE_KEY = 'meilisearch:indexing:paused'
const PAUSE_CACHE_TTL = 86400

export interface AdminIndexingPauseResponse {
  paused: boolean
  message: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingPauseResponse>) {
  const cache = req.scope.resolve(Modules.CACHE)
  setCacheRef(cache)
  await cache.set(PAUSE_CACHE_KEY, true, PAUSE_CACHE_TTL)
  res.json({
    paused: true,
    message: 'Real-time indexing has been paused. Events will be silently skipped until resumed.',
  })
}
