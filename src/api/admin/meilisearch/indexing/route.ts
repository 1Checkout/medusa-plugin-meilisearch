import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../../../../modules/meilisearch'

export interface AdminIndexingStatusResponse {
  paused: boolean
}

export async function GET(req: MedusaRequest, res: MedusaResponse<AdminIndexingStatusResponse>) {
  const meilisearchService: MeiliSearchService = req.scope.resolve(MEILISEARCH_MODULE)
  res.json({
    paused: meilisearchService.isIndexingPaused(),
  })
}
