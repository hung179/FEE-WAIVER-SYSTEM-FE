import type { SupportPolicyResponse } from "./SupportPolicyResponse";

export interface BeneficiaryResponse {
    id: number;

    name: string;

    description: string;

    supportPolicyResponse: SupportPolicyResponse[];
}