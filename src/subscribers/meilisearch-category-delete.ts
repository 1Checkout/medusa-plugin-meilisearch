import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { deleteCategoryWorkflow } from '../workflows/delete-category'
import { isSubscriptionEnabled, CATEGORY_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchCategoryDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!(await isSubscriptionEnabled(container, CATEGORY_INDEX_TYPE))) return

  const logger = container.resolve('logger')

  try {
    await deleteCategoryWorkflow(container).run({
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
    'product-category.deleted',
    // Module events
    ProductEvents.PRODUCT_CATEGORY_DELETED,
  ],
}
