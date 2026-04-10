import { useEffect, useState } from 'react';
import api from '../../../common/api/api';

export const useOrganizationsByIds = (ids?: string[]) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setData([]);
      return;
    }

    api
      .get('/manage/organization', {
        params: { ids: ids.join(',') },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(setError);
  }, [ids]);

  return { data, error };
};
