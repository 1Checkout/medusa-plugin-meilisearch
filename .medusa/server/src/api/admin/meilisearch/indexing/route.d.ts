import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export interface AdminIndexingStatusResponse {
    paused: boolean;
}
export declare function GET(req: MedusaRequest, res: MedusaResponse<AdminIndexingStatusResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map