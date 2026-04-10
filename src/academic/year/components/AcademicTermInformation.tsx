import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AcademicTerm } from '../../term/interfaces/AcademicTerm';
import { GoPencil, GoTrash } from 'react-icons/go';
import { useModal } from '../../../common/contexts/ModalContext';
import api from '../../../common/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);

type AcademicTermProps = {
  academicTerm: AcademicTerm;
  yearId: number;
};

export const AcademicTermInformation = ({
  academicTerm,
  yearId,
}: AcademicTermProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  if (!academicTerm) return null;

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`academic/year/term/${id}`),

    onSuccess: (res) => {
      openModal('CONFIRM', {
        title: 'Thông báo',
        message: res.data.data,
        type: res.data.type,
      });
      queryClient.invalidateQueries({
        queryKey: ['academicTerms', yearId],
      });
    },
    onError: () => {
      openModal('CONFIRM', {
        title: 'Lỗi',
        message: 'Không thể xóa năm học',
        type: 'ERROR',
      });
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex my-4 items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
        {/* Date */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Academic Term</span>
          <span className="font-semibold text-gray-800">
            {dayjs(academicTerm.startDate).format('MM-YYYY')} to{' '}
            {dayjs(academicTerm.endDate).format('MM-YYYY')}
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400">Status</span>
          <span
            className={`rounded-md  px-2 py-1 text-sm font-medium ${
              academicTerm.academicTermStatus === 'UPCOMING'
                ? `bg-yellow-100 text-yellow-700`
                : `${
                    academicTerm.academicTermStatus === 'ACTIVE'
                      ? `bg-green-100 text-green-700`
                      : `bg-red-100 text-red-700`
                  }`
            } `}>
            {academicTerm.academicTermStatus}
          </span>
        </div>

        {/* Updated time */}
        <div className="text-sm text-gray-500">
          {dayjs(academicTerm.updateAt).fromNow()}
        </div>
        <button
          onClick={() => {
            navigate(`/academics/${yearId}/term/${academicTerm.id}`);
          }}
          className={`p-1 rounded transition-colors
      ${
        academicTerm.academicTermStatus === 'CLOSED'
          ? 'invisible'
          : 'hover:text-white hover:bg-blue-500'
      }`}>
          <GoPencil className="size-5" />
        </button>
        <button
          onClick={() =>
            openModal('CONFIRM', {
              title: 'Xóa dữ liệu học kỳ !',
              message: 'Bạn có chắc chắn muốn xóa?',
              type: 'DELETE',
              onConfirm: () => deleteMutation.mutate(academicTerm.id),
              onCancel: () => {},
            })
          }
          className={`p-1 rounded transition-colors
      ${
        academicTerm.academicTermStatus === 'ACTIVE' ||
        academicTerm.academicTermStatus === 'CLOSED'
          ? 'invisible'
          : 'hover:text-white hover:bg-red-500'
      }`}>
          <GoTrash className="size-5" />
        </button>
      </div>
    </div>
  );
};
