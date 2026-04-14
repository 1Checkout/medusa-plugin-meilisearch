import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertProductWorkflow } from '../workflows/upsert-product'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchProductUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!(await isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE))) return

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
    // Workflow events
    'product.created',
    'product.updated',
    // Module events
    ProductEvents.PRODUCT_CREATED,
    ProductEvents.PRODUCT_UPDATED,
  ],
}
