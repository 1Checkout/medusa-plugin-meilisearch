import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertOptionWorkflow } from '../workflows/upsert-option'

export default async function meilisearchOptionUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger')

  try {
    await upsertOptionWorkflow(container).run({
      input: { id: data.id },
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const config: SubscriberConfig = {
  event: [
    // Creation indexing disabled (see meilisearch-product-upsert): options are
    // created in bulk with their product, so creation indexing is handled by the
    // post-import batched sync. Only UPDATE events index live.
    // Workflow events
    // 'product-option.created',
    'product-option.updated',
    // Module events
    // ProductEvents.PRODUCT_OPTION_CREATED,
    ProductEvents.PRODUCT_OPTION_UPDATED,
  ],
}
