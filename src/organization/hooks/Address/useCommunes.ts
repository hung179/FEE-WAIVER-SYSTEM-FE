import axios from 'axios';
import { useEffect, useState } from 'react';

interface Commune {
  code: string;
  name: string;
}

export const useCommunes = (provinceCode: string) => {
  const [communes, setCommunes] = useState<Commune[]>([]);

  useEffect(() => {
    if (!provinceCode) {
      setCommunes([]);
      return;
    }

    axios
      .get(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
      .then((res) => 
        setCommunes(res.data.wards || [])
      );
  }, [provinceCode]);

  return { communes };
};
