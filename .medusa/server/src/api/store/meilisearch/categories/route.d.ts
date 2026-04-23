import z from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { ProductCategoryDTO } from '@medusajs/types';
export declare const StoreCategoriesSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    offset: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    query: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    semanticSearch: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    semanticRatio: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    language?: string | undefined;
    offset?: number | undefined;
    limit?: number | undefined;
    semanticSearch?: boolean | undefined;
    semanticRatio?: number | undefined;
    query?: string | undefined;
    fields?: string | undefined;
}, {
    language?: string | undefined;
    offset?: number | undefined;
    limit?: number | undefined;
    semanticSearch?: boolean | undefined;
    semanticRatio?: number | undefined;
    query?: string | undefined;
    fields?: string | undefined;
}>;
export type StoreCategoriesParams = z.infer<typeof StoreCategoriesSchema>;
export interface CategoriesResponse {
    categories: ProductCategoryDTO[];
    count: number;
    limit?: number;
    offset?: number;
}
export declare function GET(req: MedusaRequest<any, StoreCategoriesParams>, res: MedusaResponse<CategoriesResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map