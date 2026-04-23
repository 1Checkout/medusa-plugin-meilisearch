import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchTagUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-tag-upsert.d.ts.map