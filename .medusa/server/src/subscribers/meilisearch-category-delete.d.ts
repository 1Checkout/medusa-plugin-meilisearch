import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchCategoryDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-category-delete.d.ts.map