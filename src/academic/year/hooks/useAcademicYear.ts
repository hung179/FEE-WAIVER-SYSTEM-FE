import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api/api';

export const useAcademicYear = (page: number, size: number) => {
  return useQuery({
    queryKey: ['academicYears', page, size],
    queryFn: async () => {
      const res = await api.get('academic/year', {
        params: { page, size },
      });

      return res.data.data;
    },
  });
};