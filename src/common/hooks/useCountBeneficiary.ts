import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useCountBeneficiary= (startDate: string ) => {
  return useQuery({
    queryKey: ['countBeneficiary', startDate],
    queryFn: async () => {
      const res = await api.get('beneficiaries/count', {
        params: { startDate },
      });
      return res.data.data;
    },
    enabled: !!startDate
  });
};