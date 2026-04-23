import z from 'zod';
import { SearchResponse } from 'meilisearch';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export declare const AdminSearchProductsSchema: z.ZodObject<{
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
export type AdminSearchProductsParams = z.infer<typeof AdminSearchProductsSchema>;
export type AdminProductsHitsResponse = SearchResponse & {
    hybridSearch?: boolean;
    semanticRatio?: number;
};
export declare function POST(req: MedusaRequest<any, AdminSearchProductsParams>, res: MedusaResponse<AdminProductsHitsResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map