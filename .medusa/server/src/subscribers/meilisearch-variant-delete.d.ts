import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchVariantDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-variant-delete.d.ts.map