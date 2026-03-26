import { MedusaRequest, MedusaResponse } from '@medusajs/framework';
export interface AdminIndexingResumeResponse {
    paused: boolean;
    message: string;
}
export declare function POST(req: MedusaRequest, res: MedusaResponse<AdminIndexingResumeResponse>): Promise<void>;
//# sourceMappingURL=route.d.ts.map