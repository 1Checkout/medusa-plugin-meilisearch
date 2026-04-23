import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchVariantUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-variant-upsert.d.ts.map