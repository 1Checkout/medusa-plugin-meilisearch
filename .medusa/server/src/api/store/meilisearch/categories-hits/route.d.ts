import z from 'zod';
import { SearchResponse } from 'meilisearch';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export declare const StoreSearchCategoriesSchema: z.ZodObject<{
    query: z.ZodString;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    language: z.ZodOptional<z.ZodString>;
    semanticSearch: z.ZodDefault<z.ZodBoolean>;
    semanticRatio: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    offset: number;
    limit: number;
    semanticSearch: boolean;
    semanticRatio: number;
    query: string;
    language?: string | undefined;
}, {
    query: string;
    language?: string | undefined;
    offset?: number | undefined;
    limit?: number | undefined;
    semanticSearch?: boolean | undefined;
    semanticRatio?: number | undefined;
}>;
export type StoreSearchCategoriesParams = z.infer<typeof StoreSearchCategoriesSchema>;
export type CategoriesHitsResponse = SearchResponse & {
    hybridSearch?: boolean;
    semanticRatio?: number;
};
export declare function GET(req: MedusaRequest<any, StoreSearchCategoriesParams>, res: MedusaResponse<CategoriesHitsResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map