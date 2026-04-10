import { useQuery } from "@tanstack/react-query";
import type { BeneficiaryResponse } from "../interfaces/BeneficiaryResponse";
import api from "../../common/api/api";

export const useBeneficiaries = () => {
    return useQuery<BeneficiaryResponse[]>({
    queryKey: ['beneficiaries'],
    queryFn: async () => {
      const res = await api.get(`beneficiaries`);
      return res.data.data;
    },
    select: (res: any)  => res.data
  });
}