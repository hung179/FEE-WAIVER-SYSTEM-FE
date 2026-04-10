import { useEffect, useState } from 'react';
import type { User } from '../../../common/interfaces/User';
import api from '../../../common/api/api';

type UseUsersProps = {
  currentPage: number;
  searchKeyword: string;
  size?: number;
};

export const useUsers = ({
  currentPage,
  searchKeyword,
  size = 10,
}: UseUsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      let res;

      if (searchKeyword.trim() === '') {
        res = (
          await api.get('/user/information/getAll', {
            params: {
              page: currentPage,
              size,
            },
          })
        ).data;
      } else {
        res = (
          await api.get('/user/information/search', {
            params: {
              keyword: searchKeyword,
              page: currentPage,
              size,
            },
          })
        ).data;
      }
      if (!res.success) {
        throw new Error('Failed to fetch users');
      }

      setUsers(res.data.data);
      setTotalPage(res.data.totalPage);
      setCurrent(res.data.currentPage);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchKeyword]);

  return {
    users,
    totalPage,
    currentPageFromServer: current,
    loading,
    error,
    refetch: fetchUsers,
  };
};
