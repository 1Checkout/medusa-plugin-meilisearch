import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchImageUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-image-upsert.d.ts.map