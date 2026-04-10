import React from 'react';
import { Controller, FormProvider, type UseFormReturn } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { AcademicTermFormType } from '../pages/UpdateAcademicTerm';
import { useModal } from '../../../common/contexts/ModalContext';

interface AcademicTermFormProps {
  form: UseFormReturn<AcademicTermFormType>;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  status?: string;
  onSubmit: (data: AcademicTermFormType) => void | Promise<void>;
  isSubmitting: boolean;
  submitMessage: { type: string; text: string };
  setSubmitMessage: React.Dispatch<
    React.SetStateAction<{ type: string; text: string }>
  >;
}

export const AcademicTermForm: React.FC<AcademicTermFormProps> = ({
  form,
  minDate,
  maxDate,
  status,
  onSubmit,
  isSubmitting,
  submitMessage,
  setSubmitMessage,
}) => {
  const startDate = form.watch('startDate');
  const isLocked = status === 'ACTIVE';
  const { openModal } = useModal();
  return (
    <FormProvider {...form}>
      <div className="m-4 flex items-center justify-center px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Tạo Học Kỳ</h1>
            <p className="text-sm text-gray-500 mt-1">
              Vui lòng chọn thời gian cho học kỳ
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ngày bắt đầu
            </label>
            <Controller
              control={form.control}
              name="startDate"
              rules={{ required: 'Vui lòng chọn ngày bắt đầu' }}
              render={({ field }) => (
                <DatePicker
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    form.formState.errors.startDate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } ${isLocked ? `bg-gray-200 text-gray-600` : null}`}
                  disabled={isLocked}
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn thời gian bắt đầu..."
                />
              )}
            />
            {form.formState.errors.startDate && (
              <span className="text-xs text-red-500">
                {form.formState.errors.startDate.message as string}
              </span>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Ngày kết thúc
            </label>
            <Controller
              control={form.control}
              name="endDate"
              rules={{
                required: 'Vui lòng chọn ngày kết thúc',
                validate: (value) =>
                  !startDate ||
                  value > startDate ||
                  'Ngày kết thúc phải sau ngày bắt đầu',
              }}
              render={({ field }) => (
                <DatePicker
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    form.formState.errors.endDate
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  selected={field.value}
                  onChange={field.onChange}
                  minDate={startDate || minDate}
                  maxDate={maxDate}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn thời gian kết thúc..."
                />
              )}
            />
            {form.formState.errors.endDate && (
              <span className="text-xs text-red-500">
                {form.formState.errors.endDate.message as string}
              </span>
            )}
          </div>

          {/* Submit Message */}
          {submitMessage.text && (
            <div
              className={`p-3 rounded-lg text-sm font-medium ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {submitMessage.text}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                openModal('CONFIRM', {
                  title: 'Cập nhật học kỳ',
                  message: 'Bạn có chắc muốn cập nhật?',
                  type: 'CONFIRM',
                  onConfirm: () => form.handleSubmit(onSubmit)(),
                })
              }
              disabled={isSubmitting}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105 focus:ring-green-400 text-white'
              }`}>
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật Học Kỳ'}
            </button>

            <button
              type="button"
              onClick={() => {
                form.reset();
                setSubmitMessage({ type: '', text: '' });
              }}
              className="flex-1 rounded-xl px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition">
              Xóa Form
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};
