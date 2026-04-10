import axios from 'axios';
import { useEffect, useState } from 'react';

interface Province {
  code: string;
  name: string;
}

export const useProvinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  useEffect(() => {
    axios
      .get('https://provinces.open-api.vn/api/v2/p/')
      .then((res) => setProvinces(res.data || []));
  }, []);
  return { provinces };
};
