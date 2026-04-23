import { RemoteQueryFilters } from '@medusajs/types';
export type SyncCategoriesWorkflowInput = {
    filters?: RemoteQueryFilters<'product_category'>;
    batchSize?: number;
};
export declare const syncCategoriesWorkflow: import("@medusajs/workflows-sdk").ReturnWorkflow<SyncCategoriesWorkflowInput, {
    totalProcessed: (number | import("@medusajs/workflows-sdk").WorkflowData<number>) & number;
    totalDeleted: (number | import("@medusajs/workflows-sdk").WorkflowData<number>) & number;
}, []>;
//# sourceMappingURL=sync-categories.d.ts.map