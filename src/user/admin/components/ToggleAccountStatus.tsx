import React, { useEffect, useState } from 'react';
import { MdOutlineChangeCircle } from 'react-icons/md';
import api from '../../../common/api/api';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';

export const ToggleAccountStatus = ({
  id,
  accountStatus,
}: {
  id: number;
  accountStatus: 'ACTIVE' | 'INACTIVE';
}) => {
  const [currentStatus, setCurrentStatus] = useState<'ACTIVE' | 'INACTIVE'>(
    accountStatus,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const changeStatus = async () => {
    try {
      setIsLoading(true);

      const res = (await api.post(`/user/information/changeStatus/${id}`)).data;

      console.log(res);

      if (res.success) {
        setCurrentStatus((prev) => (prev === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'));
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái:', error);
      alert('Không thể thay đổi trạng thái. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
      setOpen(true);
    }
  };

  return (
    <div className="flex items-center">
      <div
        className={`p-1.5 my-2 ${
          currentStatus === 'ACTIVE'
            ? 'inline-block bg-green-200 text-green-500 rounded'
            : 'rounded inline-block bg-red-200 text-red-500'
        }`}>
        {currentStatus}
      </div>
      <button
        onClick={changeStatus}
        disabled={isLoading}
        className={`ml-2 p-1.5 rounded transition-colors ${
          isLoading
            ? 'opacity-50 cursor-not-allowed'
            : currentStatus === 'ACTIVE'
            ? 'hover:bg-red-500 hover:text-white cursor-pointer'
            : 'hover:bg-green-500 hover:text-white cursor-pointer'
        }`}>
        <MdOutlineChangeCircle
          className={`size-5 ${isLoading ? 'animate-spin' : ''}`}
        />
      </button>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        title="Thay đổi trạng thái"
        message="Thay đổi trạng thái người dùng thành công"
        type="CONFIRM"
      />
    </div>
  );
};
