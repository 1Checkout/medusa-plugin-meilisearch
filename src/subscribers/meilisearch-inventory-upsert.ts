import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import { InventoryEvents } from '@medusajs/utils'
import { upsertInventoryWorkflow } from '../workflows/upsert-inventory'
import { isSubscriptionEnabled, PRODUCT_INDEX_TYPE } from '../utils/subscriber-utils'

export default async function meilisearchInventoryUpsertHandler({
  container,
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  if (!isSubscriptionEnabled(container, PRODUCT_INDEX_TYPE)) return

  const logger = container.resolve('logger')

  try {
    await upsertInventoryWorkflow(container).run({
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
    'inventory-item.created',
    'inventory-item.updated',
    // Module events
    InventoryEvents.INVENTORY_ITEM_CREATED,
    InventoryEvents.INVENTORY_ITEM_UPDATED,
  ],
}
