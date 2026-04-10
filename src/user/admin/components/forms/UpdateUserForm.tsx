import React, { useEffect, useState } from 'react';
import type { UserForm } from '../../interfaces/UserForm';
import { type UseFormReturn } from 'react-hook-form';
import { FormInput } from '../../../../common/components/sections/FormInput';
import { FormSelect } from '../../../../common/components/sections/FormSelect';
import { months, years, getDays } from '../../hooks/useDate';
import { useModal } from '../../../../common/contexts/ModalContext';
import type { Organization } from '../../../../organization/interfaces/Organization';
interface Roles {
  value: string;
  label: string;
}

interface UpdateUserFormProps {
  form: UseFormReturn<UserForm>;
  organizations: any;
  availableRoles: Roles[];
  onSubmit: (data: UserForm) => void | Promise<void>;
  isSubmitting: boolean;
  submitMessage: { type: string; text: string };
  setSubmitMessage: React.Dispatch<
    React.SetStateAction<{ type: string; text: string }>
  >;
}

export const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  form,
  organizations,
  availableRoles,
  onSubmit,
  isSubmitting,
  submitMessage,
  setSubmitMessage,
}) => {
  const { errors } = form.formState;
  const { openModal } = useModal();

  const [days, setDays] = useState<number[]>([1]);
  const year = form.watch('dateOfBirth.year');
  const month = form.watch('dateOfBirth.month');
  useEffect(() => {
    setDays(getDays(year, month));
  }, [year, month]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="space-y-6">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Cập nhật thông tin người dùng {form.getValues('username')}
            </h1>
          </div>

          <FormInput
            name="username"
            register={form.register}
            errors={errors}
            label="Username"
            type="text"
            value={form.getValues('username') || ''}
          />

          <FormInput
            name="fullName"
            register={form.register}
            errors={errors}
            label="Họ và tên"
            type="text"
            value={form.getValues('fullName') || ''}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormSelect
              label="Ngày"
              name="dateOfBirth.day"
              register={form.register}
              options={days}
              getOptionLabel={(day: number) => day.toString()}
              getOptionValue={(day: number) => day}
              errors={form.formState.errors}
              disabled={form.watch('dateOfBirth.month') === 0}
            />
            <FormSelect
              label="Tháng"
              name="dateOfBirth.month"
              register={form.register}
              options={months}
              getOptionLabel={(month: number) => 'Tháng ' + month}
              getOptionValue={(month: number) => month}
              errors={form.formState.errors}
              disabled={form.watch('dateOfBirth.year') === 0}
            />
            <FormSelect
              label="Năm"
              name="dateOfBirth.year"
              register={form.register}
              options={years}
              getOptionLabel={(year: number) => year.toString()}
              getOptionValue={(year: number) => year}
              errors={form.formState.errors}
            />
          </div>

          <FormSelect
            label="Trạng thái tài khoản"
            name="accountStatus"
            register={form.register}
            options={['ACTIVE', 'INACTIVE']}
            getOptionLabel={(org) => org}
            getOptionValue={(org) => org}
            errors={form.formState.errors}
          />

          <FormSelect
            label="Tổ chức"
            name="organizationIds"
            register={form.register}
            options={organizations}
            getOptionLabel={(org: Organization) => org.organizationName}
            getOptionValue={(org: Organization) => org.id}
            errors={form.formState.errors}
          />

          <FormSelect
            label="Vai trò"
            name="roleName"
            register={form.register}
            options={availableRoles}
            getOptionLabel={(role: Roles) => role.label}
            getOptionValue={(role: Roles) => role.value}
            errors={form.formState.errors}
          />

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
                  title: 'Cập nhật đối tượng',
                  message: 'Bạn có chắc muốn cập nhật?',
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
              {isSubmitting ? 'Đang xử lý...' : 'Tạo Người Dùng'}
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
