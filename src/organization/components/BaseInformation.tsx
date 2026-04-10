import React from 'react';
import { FormInput } from '../../common/components/sections/FormInput';
import { useFormContext } from 'react-hook-form';

export const BaseInformation = () => {
  const { register, formState, getValues } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <div>
        <FormInput
          label="Tên tổ chức"
          name="organizationName"
          register={register}
          type="text"
          errors={errors}
        />
      </div>

      <div>
        <FormInput
          label="Số điện thoại tổ chức quản lý"
          name="phoneNumber"
          register={register}
          type="text"
          errors={errors}
        />
      </div>

      <div>
        <FormInput
          label="Email tổ chức quản lý"
          name="email"
          register={register}
          type="email"
          errors={errors}
        />
      </div>
    </div>
  );
};
