import { RemoteQueryFilters } from '@medusajs/types';
export type StepInput = {
    filters?: RemoteQueryFilters<'product'>;
    batchSize?: number;
};
export declare const syncProductsStep: import("@medusajs/workflows-sdk").StepFunction<StepInput, {
    totalProcessed: number;
    totalDeleted: number;
}>;
//# sourceMappingURL=sync-products.d.ts.map