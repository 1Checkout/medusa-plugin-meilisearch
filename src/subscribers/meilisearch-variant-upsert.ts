import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertVariantWorkflow } from '../workflows/upsert-variant'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from './utils'

export default async function meilisearchVariantUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await upsertVariantWorkflow(container).run({
      input: { id: data.id },
    })
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export const config: SubscriberConfig = {
  event: [
    // Workflow events
    'product-variant.created',
    'product-variant.updated',
    // Module events
    ProductEvents.PRODUCT_VARIANT_CREATED,
    ProductEvents.PRODUCT_VARIANT_UPDATED,
  ],
}
