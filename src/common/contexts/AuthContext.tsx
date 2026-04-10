import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import api from '../api/api';
import type { User } from '../interfaces/User';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = sessionStorage.getItem('access_token');
    const cachedUser = sessionStorage.getItem('user');

    if (token) {
      try {
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }

        await refreshUser();
      } catch (error) {
        console.error('Authcheck failed: ', error);
        // clearAuthData();
      }
    }
    setIsLoading(false);
  };

  const refreshUser = async () => {
    try {
      const response = (await api.get('/user/information/myInfo')).data;
      if (response.success) {
        const userData = response.data;
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (e) {
      throw e;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response: {
        data: {
          token: string;
          authenticated: boolean;
        };
        success: boolean;
        type: any;
      } = (
        await api.post('/user/auth/token', {
          username,
          password,
        })
      ).data;

      if (response.success && response.data.token) {
        sessionStorage.setItem('access_token', response.data.token);
        await refreshUser();
      } else {
        throw new Error('Đăng nhập thất bại');
      }
    } catch (error: any) {
      clearAuth();
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/auth/logout');
    } catch (error) {
      console.error('Logout error: ', error);
    } finally {
      clearAuth();
    }
  };

  const clearAuth = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
