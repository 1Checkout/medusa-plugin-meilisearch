import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchCollectionDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-collection-delete.d.ts.map