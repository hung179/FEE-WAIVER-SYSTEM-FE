import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import login from '../../api/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // :(string | Dispatch<SetStateAction<string>>)[]
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {login , isAuthenticated} = useAuth();
  const navigate = useNavigate();
  if(isAuthenticated) {
    return <Navigate to="/home" replace/>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try{
      await login(username, password);
      navigate('/');
    }catch(err :any) {
      setError(err?.message || 'Đăng nhập thất bại');
    }finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">
        <div
          className="relative h-40 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80')",
          }}>
          <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white tracking-wide">
              ĐĂNG NHẬP
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-10 py-8 flex flex-col space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="w-full border-b border-gray-400 outline-none focus:border-green-500 py-2 transition-colors"
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full border-b border-gray-400 outline-none focus:border-green-500 py-2 transition-colors"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-green-500"
              />
              <span>Remember me</span>
            </label>
            <a
              href="#"
              className="text-green-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white py-2 rounded-3xl font-medium hover:bg-green-600 transition-colors">
            {isSubmitting ? 'Đang đăng nhập...': 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}
