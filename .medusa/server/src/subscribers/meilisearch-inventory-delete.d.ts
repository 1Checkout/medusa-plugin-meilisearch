import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchInventoryDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-inventory-delete.d.ts.map