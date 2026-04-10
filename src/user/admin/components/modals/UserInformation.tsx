import React, { useMemo } from 'react';
import type { User } from '../../../../common/interfaces/User';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useOrganizationsByIds } from '../../hooks/useOrganizationByIds';
import type { Organization } from '../../../../organization/interfaces/Organization';

type UserInformationProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
};

export const UserInformation = ({
  user,
  isOpen,
  onClose,
}: UserInformationProps) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  console.log(user);
  return createPortal(
    <>
      <div
        className="fixed inset-0 duration-500 transform transition-transform bg-stone-300/30 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}>
        <div
          className="bg-white p-4 rounded w-[90%] max-w-md max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">
              Thông tin người dùng
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* Avatar và tên */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.fullName}
                </h3>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">ID người dùng</p>
                  <p className="text-gray-800 font-medium">#{user.id}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Vai trò</p>
                  <p className="text-gray-800 font-medium capitalize">
                    {user.role}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Ngày sinh</p>
                  <p className="text-gray-800 font-medium">
                    {formatDate(user.dateOfBirth)}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Trạng thái</p>
                  <span
                    className={`p-1.5 my-2 ${
                      user.accountStatus === 'ACTIVE'
                        ? 'inline-block bg-green-200 text-green-500 rounded'
                        : 'rounded inline-block bg-red-200 text-red-500'
                    }`}>
                    {user.accountStatus}
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">
                    Cập nhật lần cuối
                  </p>
                  <p className="text-gray-800 font-medium">
                    {formatDate(user.updateAt)}
                  </p>
                </div>

                {user?.latestOrganization && (
                  <div
                    key={user.latestOrganization.id}
                    className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Tổ chức</p>
                    <p className="text-gray-800 font-medium break-all">
                      {user.latestOrganization.organizationName
                        ? String(user.latestOrganization.organizationName)
                        : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 ">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Đóng
            </button>
            <button
              onClick={() => {
                navigate(`/users/update/${user.id}`);
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};
