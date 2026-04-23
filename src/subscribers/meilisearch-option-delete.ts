import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { ProductEvents } from '@medusajs/utils'
import { deleteOptionWorkflow } from '../workflows/delete-option'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchOptionDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!(await isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE))) return

  const logger = container.resolve('logger')

  try {
    await deleteOptionWorkflow(container).run({
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
    'product-option.deleted',
    // Module events
    ProductEvents.PRODUCT_OPTION_DELETED,
  ],
}
