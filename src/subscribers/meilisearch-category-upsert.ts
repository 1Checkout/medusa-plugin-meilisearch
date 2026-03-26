import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { upsertCategoryWorkflow } from '../workflows/upsert-category'
import { isSubscriptionEnabled, CATEGORY_INDEX_TYPE } from './utils'

export default async function meilisearchCategoryUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, CATEGORY_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await upsertCategoryWorkflow(container).run({
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
    'product-category.created',
    'product-category.updated',
    // Module events
    ProductEvents.PRODUCT_CATEGORY_CREATED,
    ProductEvents.PRODUCT_CATEGORY_UPDATED,
  ],
}
