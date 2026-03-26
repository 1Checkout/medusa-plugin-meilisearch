import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../../../../../modules/meilisearch'

export interface AdminIndexingPauseResponse {
  paused: boolean
  message: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingPauseResponse>) {
  const meilisearchService: MeiliSearchService = req.scope.resolve(MEILISEARCH_MODULE)
  meilisearchService.pauseIndexing()
  res.json({
    paused: true,
    message: 'Real-time indexing has been paused. Events will be silently skipped until resumed.',
  })
}
