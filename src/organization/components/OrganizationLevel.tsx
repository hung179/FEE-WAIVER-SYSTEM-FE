import React, { useEffect, useState } from 'react';
import api from '../../common/api/api';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import type { Organization } from '../interfaces/Organization';
import * as yup from 'yup';
import type { OrganizationSchema } from '../schema/OrganizationSchema';
import { useOrganizationType } from '../hooks/Organizations/useOrganizationType';

export type OrganizationForm = yup.InferType<typeof OrganizationSchema>;

export default function OrganizationLevel() {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<OrganizationForm>();

  const managementLevel = watch('managementLevel');
  const province = watch('address.provinceCode');

  const { organizations } = useOrganizationType(managementLevel, province);

  const options = organizations.map((org) => ({
    value: String(org.id),
    label: org.organizationName,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Cấp quản lý</h2>

      {/* Cấp tổ chức quản lý */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cấp tổ chức
        </label>
        <select
          {...register('managementLevel')}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.managementLevel
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}>
          <option value="">--Cấp tổ chức--</option>
          <option value="PROVINCIAL">Sở</option>
          <option value="SCHOOL">Trường</option>
        </select>
        {errors.managementLevel && (
          <p className="mt-1 text-sm text-red-600">
            {String(errors.managementLevel.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tổ chức quản lý dưới
        </label>

        <Controller
          name="organizationIds"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={options}
              value={options.filter((opt) => field.value?.includes(opt.value))}
              onChange={(selected) =>
                field.onChange(selected.map((s) => s.value))
              }
              isDisabled={!managementLevel || options.length === 0}
              placeholder="Chọn một hoặc nhiều tổ chức dưới..."
            />
          )}
        />
      </div>
    </div>
  );
}
