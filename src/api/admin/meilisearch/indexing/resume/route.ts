import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { Modules } from '@medusajs/utils'
import { setCacheRef } from '../../../../../modules/meilisearch/services/meilisearch'

const PAUSE_CACHE_KEY = 'meilisearch:indexing:paused'

export interface AdminIndexingResumeResponse {
  paused: boolean
  message: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingResumeResponse>) {
  const cache = req.scope.resolve(Modules.CACHE)
  setCacheRef(cache)
  await cache.invalidate(PAUSE_CACHE_KEY)
  res.json({
    paused: false,
    message: 'Real-time indexing has been resumed. Events will be processed normally.',
  })
}
