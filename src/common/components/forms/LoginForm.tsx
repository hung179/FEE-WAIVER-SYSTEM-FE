import { Navigate } from "react-router-dom";
import type { UseFormReturn } from "react-hook-form";

type LoginFormValues = {
  username: string;
  password: string;
};

interface Props {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (data: LoginFormValues) => void | Promise<void>;
  isAuthenticated: boolean;
}

export const LoginForm = ({ form, onSubmit, isAuthenticated }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg overflow-hidden">

        {/* Header */}
        <div
          className="relative h-40 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white">
              ĐĂNG NHẬP
            </h2>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-10 py-8 flex flex-col space-y-6"
        >
          {/* Username */}
          <div>
            <label className="block text-sm mb-1">Tên đăng nhập</label>
            <input
              {...register("username")}
              className="w-full border-b border-gray-400 focus:border-green-500 py-2 outline-none"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input
              type="password"
              {...register("password")}
              className="w-full border-b border-gray-400 focus:border-green-500 py-2 outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Global error */}
          {errors.root && (
            <p className="text-red-500 text-center">
              {errors.root.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white py-2 rounded-3xl hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};