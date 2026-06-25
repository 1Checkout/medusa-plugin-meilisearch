import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { PricingEvents } from '@medusajs/utils'
import { upsertPriceWorkflow } from '../workflows/upsert-price'

export default async function meilisearchPriceUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve('logger')

  try {
    await upsertPriceWorkflow(container).run({
      input: { id: data.id },
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const config: SubscriberConfig = {
  event: [
    // Creation indexing disabled (see meilisearch-product-upsert): prices are
    // created in bulk with their product, so creation indexing is handled by the
    // post-import batched sync. Only UPDATE events index live (live price changes).
    // Workflow events
    // 'price.created',
    // 'price.updated',
    // Module events
    // PricingEvents.PRICE_CREATED,
    // PricingEvents.PRICE_UPDATED,
  ],
}
