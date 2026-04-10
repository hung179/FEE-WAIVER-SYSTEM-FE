import { Controller, type UseFormReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { useModal } from '../../../../common/contexts/ModalContext';
import type { AcademicYearFormType } from '../../pages/CreateAcademicYear';

interface AcademicYearFormProps {
  form: UseFormReturn<AcademicYearFormType>;
  onSubmit: (data: AcademicYearFormType) => void | Promise<void>;
  isSubmitting: boolean;
  submitMessage: { type: string; text: string };
  setSubmitMessage: React.Dispatch<
    React.SetStateAction<{ type: string; text: string }>
  >;
}

export const AcademicYearForm: React.FC<AcademicYearFormProps> = ({
  form,
  onSubmit,
  isSubmitting,
  submitMessage,
  setSubmitMessage,
}) => {
  const startDate = form.watch('startDate');
  const { openModal } = useModal();
  useEffect(() => {
    const endDate = form.getValues('endDate');
    if (startDate && endDate && endDate < startDate) {
      form.setValue('endDate', startDate);
    }
  }, [startDate]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="space-y-6">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Thêm Năm Học Mới
            </h1>
            <p className="text-sm text-gray-600">
              Điền thông tin năm học để tạo mới
            </p>
          </div>
          <div>
            <Controller
              control={form.control}
              name="startDate"
              rules={{ required: 'Start date is required' }}
              render={({ field }) => (
                <DatePicker
                  className={`w-full my-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    form.formState.errors.startDate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn thời gian bắt đầu..."
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={form.control}
              name="endDate"
              rules={{ required: 'End date is required' }}
              render={({ field }) => (
                <DatePicker
                  className={`w-full my-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    form.formState.errors.endDate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  disabled={!startDate}
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={startDate || undefined}
                  maxDate={new Date('2100-12-31')}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn thời gian kết thúc..."
                />
              )}
            />
          </div>
          {/* Thông báo */}
          {submitMessage.text && (
            <div
              className={`mb-4 p-4 rounded-md ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
              <p className="text-sm font-medium">{submitMessage.text}</p>
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                openModal('CONFIRM', {
                  title: 'Tiến hành tạo dữ liệu năm học ?',
                  message: 'Bạn có chắc chắn muốn tạo?',
                  type: 'CONFIRM',
                  onConfirm: () => form.handleSubmit(onSubmit)(),
                })
              }
              disabled={isSubmitting}
              className={`flex-1 rounded-full px-6 py-3 font-semibold shadow-md transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105 focus:ring-green-400 text-white'
              }`}>
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật Năm Học'}
            </button>

            <button
              type="button"
              onClick={() => {
                form.reset();
                setSubmitMessage({ type: '', text: '' });
              }}
              className="flex-1 rounded-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
              Xóa Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
