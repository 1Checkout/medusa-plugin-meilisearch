import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { deleteCollectionWorkflow } from '../workflows/delete-collection'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchCollectionDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await deleteCollectionWorkflow(container).run({
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
    'product-collection.deleted',
    // Module events
    ProductEvents.PRODUCT_COLLECTION_DELETED,
  ],
}
