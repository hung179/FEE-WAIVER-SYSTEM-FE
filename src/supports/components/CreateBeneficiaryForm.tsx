import React, { useState } from 'react';
import { FormInput } from '../../common/components/sections/FormInput';
import type { BeneficiaryFormType } from '../pages/CreateSupport';
import {
  FormProvider,
  useFieldArray,
  type UseFormReturn,
} from 'react-hook-form';
import { useModal } from '../../common/contexts/ModalContext';

interface CreateBeneficiaryFormProps {
  form: UseFormReturn<BeneficiaryFormType>;
  onSubmit: (data: BeneficiaryFormType) => void | Promise<void>;
  isSubmitting: boolean;
  submitMessage: { type: string; text: string };
  setSubmitMessage: React.Dispatch<
    React.SetStateAction<{ type: string; text: string }>
  >;
}

export const CreateBeneficiaryForm: React.FC<CreateBeneficiaryFormProps> = ({
  form,
  onSubmit,
  isSubmitting,
  submitMessage,
  setSubmitMessage,
}) => {
  const { openModal } = useModal();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'supportPolicyRequest',
  });

  const values = form.watch('supportPolicyRequest');
  const isEmpty = !values || values.length === 0;

  const spError = form.formState.errors.supportPolicyRequest;
  const isError = !!spError && isEmpty;

  const activeValues = values?.filter((p) => !p.isDeleted) || [];

  const hasTuition = activeValues.some((p) => p.type === 'TUITION');
  const hasExpense = activeValues.some((p) => p.type === 'EXPENSE');

  const onError = (errors: any) => {
    console.log('VALIDATION ERROR:', errors);
  };
  return (
    <FormProvider {...form}>
      <div className="m-4 flex items-center justify-center px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Thêm đối tượng mới
            </h1>
            <p className="text-sm text-gray-600">
              Điền thông tin đối tượng để tạo mới
            </p>
          </div>

          <FormInput
            label="Tên loại đối tượng"
            name="name"
            register={form.register}
            type="text"
            errors={form.formState.errors}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả đối tượng <span className="text-red-500">*</span>
            </label>
            <textarea
              {...form.register('description')}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                form.formState.errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Nhập mô tả..."
              rows={4}
            />

            {form.formState.errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {String(form.formState.errors.description?.message)}
              </p>
            )}
          </div>

          <div className="mb-4">
            {fields.map((field, index) => {
              const item = form.watch(`supportPolicyRequest.${index}`);

              if (!item || item.isDeleted) return null;

              const type = item.type;

              return (
                <div
                  key={field.id}
                  className=" my-4 border border-gray-300 p-4 rounded-xl">
                  {type === 'TUITION' && (
                    <>
                      <h1 className="text-xl font-bold text-gray-800 mb-2">
                        Hỗ trợ học phí{' '}
                      </h1>
                      <FormInput
                        type="text"
                        label="Tên chính sách"
                        name={`supportPolicyRequest.${index}.name`}
                        register={form.register}
                        errors={form.formState.errors}
                      />

                      <FormInput
                        type="text"
                        label="Phần trăm học phí hỗ trợ (%)"
                        name={`supportPolicyRequest.${index}.percentage`}
                        register={form.register}
                        errors={form.formState.errors}
                      />

                      <FormInput
                        type="number"
                        label="Số tiền hỗ trợ thêm (Nếu có)"
                        name={`supportPolicyRequest.${index}.amount`}
                        register={form.register}
                        errors={form.formState.errors}
                        isRequire={false}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const item = form.getValues(
                            `supportPolicyRequest.${index}`,
                          );

                          if (item.id) {
                            form.setValue(
                              `supportPolicyRequest.${index}.isDeleted`,
                              true,
                            );
                          } else {
                            remove(index);
                          }
                        }}
                        className="text-red-500">
                        Xóa
                      </button>
                    </>
                  )}

                  {type === 'EXPENSE' && (
                    <>
                      <h1 className="text-xl font-bold text-gray-800 mb-2">
                        Hỗ trợ chi phí{' '}
                      </h1>
                      <FormInput
                        type="text"
                        label="Tên chính sách"
                        name={`supportPolicyRequest.${index}.name`}
                        register={form.register}
                        errors={form.formState.errors}
                      />

                      <FormInput
                        type="number"
                        label="Số tiền hỗ trợ"
                        name={`supportPolicyRequest.${index}.amount`}
                        register={form.register}
                        errors={form.formState.errors}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const item = form.getValues(
                            `supportPolicyRequest.${index}`,
                          );

                          if (item.id) {
                            form.setValue(
                              `supportPolicyRequest.${index}.isDeleted`,
                              true,
                            );
                          } else {
                            remove(index);
                          }
                        }}
                        className="text-red-500">
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              );
            })}

            {hasTuition && hasExpense ? null : (
              <div
                className={`my-4 p-4 rounded-xl  transition ${
                  isError ? 'border border-red-400 bg-red-50' : ' bg-white'
                }`}>
                <div className="flex gap-4">
                  {!hasTuition && (
                    <button
                      className="flex-1 rounded-lg px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                      type="button"
                      onClick={() =>
                        append({
                          name: '',
                          type: 'TUITION',
                          percentage: undefined,
                          isDeleted: false,
                        })
                      }>
                      Thêm học phí
                    </button>
                  )}

                  {!hasExpense && (
                    <button
                      className="flex-1 rounded-lg px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                      type="button"
                      onClick={() =>
                        append({
                          name: '',
                          type: 'EXPENSE',
                          amount: undefined,
                          isDeleted: false,
                        })
                      }>
                      Thêm chi phí
                    </button>
                  )}
                </div>

                {isError && !Array.isArray(spError) && (
                  <div className="mt-3">
                    <p className="text-sm text-red-600 font-medium">
                      {spError.message}
                    </p>
                    <p className="text-xs text-red-500 mt-1">
                      👉 Vui lòng chọn ít nhất một loại hỗ trợ
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() =>
                openModal('CONFIRM', {
                  title: 'Cập nhật đối tượng',
                  message: 'Bạn có chắc muốn cập nhật?',
                  type: 'CONFIRM',
                  onConfirm: () => form.handleSubmit(onSubmit, onError)(),
                })
              }
              disabled={isSubmitting}
              className={`flex-1 rounded-xl px-6 py-3 font-semibold transition transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105 focus:ring-green-400 text-white'
              }`}>
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật Đối tượng'}
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
