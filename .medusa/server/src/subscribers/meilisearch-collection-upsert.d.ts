import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchCollectionUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-collection-upsert.d.ts.map