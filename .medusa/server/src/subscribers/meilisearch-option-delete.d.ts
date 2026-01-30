import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
export default function meilisearchOptionDeleteHandler({ container, event: { data }, }: SubscriberArgs<{
    id: string;
}>): Promise<void>;
export declare const config: SubscriberConfig;
//# sourceMappingURL=meilisearch-option-delete.d.ts.map