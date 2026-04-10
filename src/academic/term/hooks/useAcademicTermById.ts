import { useEffect, useState } from 'react';
import api from '../../../common/api/api';
import type { AcademicTerm } from '../interfaces/AcademicTerm';

export const useAcademicTermById = (id?: string) => {
  const [academicTerm, setAcademicTerm] = useState<AcademicTerm>();

  useEffect(() => {
    const fetchAcademicTerm = async () => {
      await api
        .get(`academic/year/term/${id}`)
        .then((res) => {
          setAcademicTerm(res.data.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    fetchAcademicTerm();
  }, []);

  return { academicTerm };
};
