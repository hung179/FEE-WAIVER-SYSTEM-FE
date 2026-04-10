import React, { useEffect } from 'react';
import { GoPencil, GoTrash } from 'react-icons/go';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import type { AcademicYear } from '../../interfaces/AcademicYear';
import dayjs from 'dayjs';
import { useAcademicYear } from '../../hooks/useAcademicYear';
import api from '../../../../common/api/api';
import { useModal } from '../../../../common/contexts/ModalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AcademicYearInformation } from '../modals/AcademicYearInformation';

type AcademicYearProps = {
  academicYear: AcademicYear;
  currentPage: number;
};

export const AcademicYearTable = ({
  currentPage,
  setCurrentPage,
  setTotalPage,
}: {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data } = useAcademicYear(currentPage, 10);
  const academicYears: AcademicYear[] = data?.data;
  const totalPage = data?.totalPage;
  useEffect(() => {
    setTotalPage(totalPage);
  }, [totalPage]);

  return (
    <div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {academicYears?.map((academicYear) => (
            <TableRow
              currentPage={currentPage}
              key={academicYear.id}
              academicYear={academicYear}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5"> Academic Year </th>
        <th className="text-start p-1.5"> Status </th>
        <th className="text-start p-1.5"> Last Updated </th>
        <th className="text-center p-1.5"> Tools </th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ academicYear, currentPage }: AcademicYearProps) => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const deleteYear = useMutation({
    mutationFn: (id: number) => api.delete(`academic/year/${id}`),
    onSuccess: (res) => {
      openModal('CONFIRM', {
      title: 'Thông báo',
      message: res.data.data,
      type: res.data.type,
    });
      queryClient.invalidateQueries({
        queryKey: ['academicYears', currentPage, 10],
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
    <tr className="text-sm text-stone-500">
      <td className="p-1.5">
        {dayjs(academicYear.startDate).format('YYYY')} -{' '}
        {dayjs(academicYear.endDate).format('YYYY')}
      </td>
      <td className="p-1.5">{academicYear.academicYearStatus}</td>
      <td className="p-1.5">{dayjs(academicYear.updateAt).fromNow()}</td>
      <td className=" p-1.5 ">
        <div className="flex justify-between items-center">
          <button
            onClick={() => openModal('AcademicYearInformation', { academicYear })}
            className="hover:text-white hover:bg-amber-500 transition-colors rounded cursor-pointer p-1">
            <IoEyeOutline className="size-5" />
          </button>
          <button
            onClick={() =>
              navigate(`/academics/year/update/${academicYear.id}`)
            }
            className={`p-1 rounded transition-colors
      ${
        academicYear.academicYearStatus === 'CLOSED'
          ? 'invisible'
          : 'hover:text-white hover:bg-blue-500'
      }`}>
            <GoPencil className="size-5" />
          </button>

          <button
            onClick={() =>
              openModal('CONFIRM', {
                title: 'Xóa dữ liệu năm học !',
                message: 'Bạn có chắc chắn muốn xóa?',
                type: 'DELETE',
                onConfirm: () => deleteYear.mutate(academicYear.id),
              })
            }
            className={`p-1 rounded transition-colors
      ${
        academicYear.academicYearStatus === 'ACTIVE' ||
        academicYear.academicYearStatus === 'CLOSED'
          ? 'invisible'
          : 'hover:text-white hover:bg-red-500'
      }`}>
            <GoTrash className="size-5" />
          </button>
          <AcademicYearInformation />
        </div>
      </td>
    </tr>
  );
};
