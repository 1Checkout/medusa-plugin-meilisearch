import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchPriceDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-price-delete.d.ts.map