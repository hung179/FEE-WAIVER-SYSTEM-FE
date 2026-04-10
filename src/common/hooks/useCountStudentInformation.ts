import { useQuery } from '@tanstack/react-query';
import api from '../api/api';

export const useCountStudentInformation = (startDate: string) => {
  return useQuery({
    queryKey: ['countStudentInformation', startDate],
    queryFn: async () => {
      const res = await api.get('student/information/count', {
        params: { startDate },
      });

      return res.data.data;
    },
    enabled: !!startDate,
  });
};
