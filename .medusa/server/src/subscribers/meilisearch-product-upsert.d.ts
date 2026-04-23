import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchProductUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-product-upsert.d.ts.map