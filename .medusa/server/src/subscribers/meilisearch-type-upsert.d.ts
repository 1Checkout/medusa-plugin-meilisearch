import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchTypeUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-type-upsert.d.ts.map