import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchPriceUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-price-upsert.d.ts.map