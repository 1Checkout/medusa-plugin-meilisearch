import { RemoteQueryFilters } from '@medusajs/types';
type SyncProductsWorkflowInput = {
    filters?: RemoteQueryFilters<'product_category'>;
    batchSize?: number;
};
export declare const syncProductsWorkflow: import("@medusajs/workflows-sdk").ReturnWorkflow<SyncProductsWorkflowInput, {
    totalProcessed: (number | import("@medusajs/workflows-sdk").WorkflowData<number>) & number;
    totalDeleted: (number | import("@medusajs/workflows-sdk").WorkflowData<number>) & number;
}, []>;
export {};
//# sourceMappingURL=sync-products.d.ts.map