import { useQuery } from "@tanstack/react-query";
import type { BeneficiaryResponse } from "../interfaces/BeneficiaryResponse";
import api from "../../common/api/api";

export const useBeneficiaryById = (id?: string) => {
    return useQuery<BeneficiaryResponse>({
    queryKey: ['beneficiary', id],
    queryFn: async () => {
      const res = await api.get(`beneficiaries/${id}`);
      return res.data;
    },
    select: (res: any)  => res.data,
    enabled: !!id,
  });
}