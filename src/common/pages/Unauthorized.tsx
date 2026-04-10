import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex justify-center mb-4">
          <IoCloseCircle className="text-red-500 text-6xl animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          403 - Không được phép
        </h1>

        <p className="text-gray-500 mb-6">
          Bạn không có quyền truy cập vào trang này.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition active:scale-95">
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
