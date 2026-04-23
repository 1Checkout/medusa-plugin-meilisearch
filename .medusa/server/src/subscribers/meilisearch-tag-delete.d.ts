import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchTagDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-tag-delete.d.ts.map