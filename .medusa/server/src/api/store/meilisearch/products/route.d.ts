import z from 'zod';
import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
import { ProductDTO } from '@medusajs/types';
export declare const StoreProductsSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    offset: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    region_id: z.ZodOptional<z.ZodString>;
    currency_code: z.ZodOptional<z.ZodString>;
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
    region_id?: string | undefined;
    currency_code?: string | undefined;
}, {
    language?: string | undefined;
    offset?: number | undefined;
    limit?: number | undefined;
    semanticSearch?: boolean | undefined;
    semanticRatio?: number | undefined;
    query?: string | undefined;
    fields?: string | undefined;
    region_id?: string | undefined;
    currency_code?: string | undefined;
}>;
export type StoreProductsParams = z.infer<typeof StoreProductsSchema>;
export interface ProductsResponse {
    products: ProductDTO[];
    count: number;
    limit?: number;
    offset?: number;
}
export declare function GET(req: MedusaRequest<any, StoreProductsParams>, res: MedusaResponse<ProductsResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map