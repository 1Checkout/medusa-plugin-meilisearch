import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertOptionValueWorkflow } from '../workflows/upsert-option-value'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from './utils'

export default async function meilisearchOptionValueUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await upsertOptionValueWorkflow(container).run({
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
    'product-option-value.created',
    'product-option-value.updated',
    // Module events
    ProductEvents.PRODUCT_OPTION_VALUE_CREATED,
    ProductEvents.PRODUCT_OPTION_VALUE_UPDATED,
  ],
}
