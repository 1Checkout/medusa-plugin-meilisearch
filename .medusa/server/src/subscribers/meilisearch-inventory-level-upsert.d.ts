import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchInventoryLevelUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-inventory-level-upsert.d.ts.map