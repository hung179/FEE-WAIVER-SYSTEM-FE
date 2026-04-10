import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api/api';
import type { AcademicTerm } from '../interfaces/AcademicTerm';

export const useAcademicTermByYearId = (yearId: number) => {
  return useQuery<AcademicTerm[]>({
    queryKey: ['academicTerms', yearId],
    queryFn: async () => {
      const res = await api.get(`academic/year/${yearId}/term`);
      return res.data.data;
    },
    enabled: !!yearId,
  });
};
