import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchOptionValueUpsertHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-option-value-upsert.d.ts.map