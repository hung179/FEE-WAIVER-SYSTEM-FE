import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AcademicTermInformation } from '../AcademicTermInformation';
import { useAcademicTermByYearId } from '../../../term/hooks/useAcademicTermByYearId';
import { useModal } from '../../../../common/contexts/ModalContext';

export const AcademicYearInformation = () => {
const { modalStack, closeModal } = useModal();
  const navigate = useNavigate();

  const currentModal = modalStack[modalStack.length - 1];
  const academicYear = currentModal?.data?.academicYear;

  const { data: academicTerms } = useAcademicTermByYearId(academicYear?.id);

  if (!currentModal || currentModal.name !== 'AcademicYearInformation') return null;
  if (!academicYear) return null;

  const allowedSemester = academicTerms?.length===2;
  return createPortal(
    <>
      <div
        className="fixed inset-0 duration-500 transform transition-transform bg-stone-300/30 backdrop-blur-sm flex items-center justify-center"
        onClick={closeModal}>
        <div
          className="bg-white p-4 rounded w-[90%] max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Năm học {dayjs(academicYear.startDate).format('YYYY')} -{' '}
              {dayjs(academicYear.endDate).format('YYYY')}
            </h2>
            <button
              onClick={closeModal}
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
          <div className="m-4">
            <div>
              {academicTerms?.map((academicTerm) => (
                <AcademicTermInformation
                  key={academicTerm.id}
                  yearId={academicYear.id}
                  academicTerm={academicTerm}
                />
              ))}
            </div>
            {!allowedSemester ? (
              <button
                onClick={() => {
                  navigate(`/academics/${academicYear.id}/term`);
                }}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Thêm học kỳ
              </button>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 ">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Đóng
            </button>
            <button
              onClick={() => {
                navigate(`academics/year/${academicYear.id}`);
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
