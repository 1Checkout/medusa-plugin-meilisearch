import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchInventoryUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-inventory-upsert.d.ts.map