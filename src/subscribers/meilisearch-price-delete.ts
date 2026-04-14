import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { PricingEvents } from '@medusajs/utils'
import { deletePriceWorkflow } from '../workflows/delete-price'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchPriceDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await deletePriceWorkflow(container).run({
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
    'price.deleted',
    // Module events
    PricingEvents.PRICE_DELETED,
  ],
}
