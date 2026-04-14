import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { InventoryEvents } from '@medusajs/utils'
import { deleteInventoryWorkflow } from '../workflows/delete-inventory'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchInventoryDeleteHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!(await isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE))) return

  const logger = container.resolve('logger')

  try {
    await deleteInventoryWorkflow(container).run({
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
    'inventory-item.deleted',
    // Module events
    InventoryEvents.INVENTORY_ITEM_DELETED,
  ],
}
