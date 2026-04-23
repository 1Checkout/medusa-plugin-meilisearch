import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchCategoryUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-category-upsert.d.ts.map