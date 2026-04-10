import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

export const useCountUser = (startDate: string) => {
  return useQuery({
    queryKey: ['countUser', startDate],
    queryFn: async () => {
      const res = await api.get('user/information/count', {
        params: { startDate },
      });

      return res.data.data;
    },
    enabled: !!startDate,
  });
};
