import { useEffect, useState } from 'react';
import type { Organization } from '../../interfaces/Organization';
import api from '../../../common/api/api';

export const useOrganizationType = (
  managementLevel?: string,
  province?: string,
) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    async function fetchOrganization() {
      if (!managementLevel || managementLevel === 'SCHOOL') {
        setOrganizations([]);
        return;
      }

      try {
        if (managementLevel === 'PROVINCIAL') {
          const res = (
            await api.post(
              'manage/organization/type/provincial',
              { provinceCode: province },
              {
                headers: { 'Content-Type': 'application/json' },
              },
            )
          ).data;
          if (res.success) {
            setOrganizations(res.data);
          } else {
            setOrganizations([]);
          }
        } else if (managementLevel === 'NATIONAL') {
          const res = (
            await api.post('manage/organization/type/provincial', {
              headers: { 'Content-Type': 'application/json' },
            })
          ).data;
          if (res.success) {
            setOrganizations(res.data);
          } else {
            setOrganizations([]);
          }
        } else {
          setOrganizations([]);
          alert('Sai loại cấp !');
        }
      } catch (error) {
        console.error('Error fetching organization:', error);
        setOrganizations([]);
      }
    }

    fetchOrganization();
  }, [managementLevel, province]);

  return { organizations };
};
