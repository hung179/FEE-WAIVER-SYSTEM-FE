import { useForm } from 'react-hook-form';
import { LoginForm } from '../components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../schemas/Login';
import type { LoginFormValues } from '../interfaces/LoginFormValues';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(LoginSchema),
  });

  const { setError } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.username, data.password);
      navigate('/');
    } catch (err: any) {
      setError('root', {
        message: err?.message || 'Đăng nhập thất bại',
      });
    }
  };

  return (
    <LoginForm
      form={form}
      onSubmit={onSubmit}
      isAuthenticated={isAuthenticated}
    />
  );
}
