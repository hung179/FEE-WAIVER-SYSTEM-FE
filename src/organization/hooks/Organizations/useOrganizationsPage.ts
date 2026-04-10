import { useEffect, useState } from 'react';
import api from '../../../common/api/api';
import type { Organization } from '../../interfaces/Organization';

export const useOrganizationsPage = (
  currentPage: number,
  searchKeyword: string,
) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchKeyword.trim() === '') {
          const res = (
            await api.get('manage/organization/page', {
              params: {
                page: currentPage,
                size: 10,
              },
            })
          ).data;

          if (!res.success || res.data.totalElement < 1) {
            throw new Error('Users not found');
          }
          setOrganizations(res.data.data);
          setTotalPage(res.data.totalPage);
        } else {
          
          const res = (
            await api.get('manage/organization/search', {
              params: {
                keyword: searchKeyword,
                page: currentPage,
                size: 10,
              },
            })
          ).data;
          if (!res.success) {
            throw new Error('Users not found');
          }

          setOrganizations(res.data.data);
          setTotalPage(res.data.totalPage);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, searchKeyword]);

  return { organizations, totalPage };
};
