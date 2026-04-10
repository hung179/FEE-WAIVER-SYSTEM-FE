import { useEffect, useState } from 'react';
import api from '../../../common/api/api';

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api
      .get('/manage/organization')
      .then((res) => {
        setOrganizations(res.data.data);
      })
      .catch((err) => setError(err));
  }, []);
  return { organizations, error };
};
