import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import { MEILISEARCH_MODULE, MeiliSearchService } from '../../../../../modules/meilisearch'

export interface AdminIndexingResumeResponse {
  paused: boolean
  message: string
}

export async function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingResumeResponse>) {
  const meilisearchService: MeiliSearchService = req.scope.resolve(MEILISEARCH_MODULE)
  meilisearchService.resumeIndexing()
  res.json({
    paused: false,
    message: 'Real-time indexing has been resumed. Events will be processed normally.',
  })
}
