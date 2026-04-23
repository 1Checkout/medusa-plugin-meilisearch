import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchProductDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-product-delete.d.ts.map