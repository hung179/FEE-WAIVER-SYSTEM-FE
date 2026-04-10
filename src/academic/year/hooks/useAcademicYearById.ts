import { useEffect, useState } from 'react';
import type { AcademicYear } from '../interfaces/AcademicYear';
import api from '../../../common/api/api';

export const useAcademicYearById = (id?: string) => {
  const [academicYear, setAcademicYear] = useState<AcademicYear>();

  useEffect(() => {
    const fetchAcademicYear = async () => {
      await api
        .get(`academic/year/${id}`)
        .then((res) => {
          setAcademicYear(res.data.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    fetchAcademicYear();
  }, []);

  return { academicYear };
};
