import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { PricingEvents } from '@medusajs/utils'
import { upsertPriceWorkflow } from '../workflows/upsert-price'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchPriceUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!(await isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE))) return

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
    // Workflow events
    'price.created',
    'price.updated',
    // Module events
    PricingEvents.PRICE_CREATED,
    PricingEvents.PRICE_UPDATED,
  ],
}
