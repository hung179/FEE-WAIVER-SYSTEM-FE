import { useEffect, useState } from 'react';
import type { Organization } from '../../interfaces/Organization';
import api from '../../../common/api/api';

export const useOrganizationChildren = (id?: number) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    if (!id) return; // ✅ chặn ở đây

    async function fetchOrganizationChildren() {
      try {
        const res = (await api.get(`manage/organization/parent/${id}`)).data;

        if (res.success) {
          setOrganizations(res.data);
        } else {
          setOrganizations([]);
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
        setOrganizations([]);
      }
    }

    fetchOrganizationChildren();
  }, [id]);

  return { organizations };
};
