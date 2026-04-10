import { useEffect, useState } from 'react';
import api from '../api/api';
import type { User } from '../interfaces/User';

const getUser = async (value: string) => {
  try {
    const res = (await api.get(`/user/information/${value}`)).data;
    if (!res.success) {
      throw new Error('Users not found');
    }
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = (await getUser('getAll')).data;
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { users, loading, error };
};

export const useUser = (userId?: string) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUser(`get/${userId}`);
        setUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return { user, loading, error };
};
