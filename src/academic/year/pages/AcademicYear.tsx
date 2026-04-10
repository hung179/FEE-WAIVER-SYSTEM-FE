import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../../../common/components/Pagination';
import { FaCalendarPlus } from 'react-icons/fa';
import { AcademicYearTable } from '../components/table/AcademicYearTable';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';
import { AcademicYearInformation } from '../components/modals/AcademicYearInformation';

export const AcademicYear = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  return (
    <div className="grid grid-rows-[50px_1fr_auto] min-h-screen">
      <div className="h-full flex justify-end items-center">
        <button
          onClick={() => {
            navigate('/academics/year/create');
          }}
          className="flex justify-center items-center border border-violet-500 rounded h-2/3 p-2 hover:text-white hover:bg-violet-500 transition-colors">
          <FaCalendarPlus />
          Add Academic Year
        </button>
      </div>
      <div>
        <AcademicYearTable
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPage={setTotalPage}
        />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <ConfirmModal />
      <AcademicYearInformation />
    </div>
  );
};
