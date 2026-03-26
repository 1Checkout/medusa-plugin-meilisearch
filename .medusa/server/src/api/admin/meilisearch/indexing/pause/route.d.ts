import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export interface AdminIndexingPauseResponse {
    paused: boolean;
    message: string;
}
export declare function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingPauseResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map