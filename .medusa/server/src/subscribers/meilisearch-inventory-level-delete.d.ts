import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchInventoryLevelDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-inventory-level-delete.d.ts.map