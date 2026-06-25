import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertProductWorkflow } from '../workflows/upsert-product'

export default async function meilisearchProductUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger')

  try {
    await upsertProductWorkflow(container).run({
      input: { id: data.id },
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const config: SubscriberConfig = {
  event: [
    // Creation indexing disabled: bulk imports create products and would emit
    // one indexing task per product (flooding Meili + the event bus). New
    // products are indexed by the post-import batched sync instead. Only UPDATE
    // events index live (e.g. price change, out-of-stock). Re-enable the
    // commented lines below to restore per-product creation indexing.
    // Workflow events
    // 'product.created',
    // 'product.updated',
    // Module events
    // ProductEvents.PRODUCT_CREATED,
    // ProductEvents.PRODUCT_UPDATED,
  ],
}
