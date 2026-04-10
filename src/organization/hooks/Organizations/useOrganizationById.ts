import React, { useEffect, useState } from 'react';
import api from '../../../common/api/api';
import type { Organization } from '../../interfaces/Organization';

export const useOrganizationById = (id?: string) => {
  const [organization, setOrganization] = useState<Organization>();
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const getOrganizationById = async () => {
      api
        .get(`/manage/organization/${id}`)
        .then((res) => {
          setOrganization(res.data.data);
        })
        .catch((err) => setError(err));
    };
    getOrganizationById();
  }, [id]);
  return { organization, error };
};
