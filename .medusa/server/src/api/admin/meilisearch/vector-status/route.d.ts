import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export interface AdminVectorStatusResponse {
    enabled: boolean;
    provider?: string;
    model?: string;
    dimensions?: number;
    embeddingFields: string[];
    semanticRatio: number;
}
export declare function GET(req: MedusaRequest, res: MedusaResponse<AdminVectorStatusResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map