import { RemoteQueryFilters } from '@medusajs/types';
export type StepInput = {
    filters?: RemoteQueryFilters<'product_category'>;
    batchSize?: number;
};
export declare const syncCategoriesStep: import("@medusajs/workflows-sdk").StepFunction<StepInput, {
    totalProcessed: number;
    totalDeleted: number;
}>;
//# sourceMappingURL=sync-categories.d.ts.map