import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { deleteVariantWorkflow } from '../workflows/delete-variant'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from './utils'

export default async function meilisearchVariantDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await deleteVariantWorkflow(container).run({
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
    'product-variant.deleted',
    // Module events
    ProductEvents.PRODUCT_VARIANT_DELETED,
  ],
}
