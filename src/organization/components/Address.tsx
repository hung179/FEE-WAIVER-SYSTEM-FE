import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import type { OrganizationSchema } from '../schema/OrganizationSchema';
import { useProvinces } from '../hooks/Address/useProvinces';
import { useCommunes } from '../hooks/Address/useCommunes';

export type OrganizationForm = yup.InferType<typeof OrganizationSchema>;

export const AddressForm = () => {
  const { register, watch, formState } = useFormContext<OrganizationForm>();

  const { errors } = formState;
  const provinceCode = watch('address.provinceCode');

  const { provinces } = useProvinces();

  const { communes } = useCommunes(provinceCode);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Địa chỉ</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tỉnh / Thành phố
        </label>
        <select
          {...register('address.provinceCode')}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.address?.provinceCode
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}>
          <option value="">-- Chọn tỉnh / thành phố --</option>
          {provinces.map((p) => (
            <option
              key={p.code}
              value={p.code}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.address?.provinceCode && (
          <p className="mt-1 text-sm text-red-600">
            {String(errors.address?.provinceCode?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Xã / Phường
        </label>
        <select
          {...register('address.communeCode')}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.address?.communeCode
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
          disabled={!watch('address.provinceCode')}>
          <option value="">-- Chọn xã / phường --</option>
          {communes.map((c) => (
            <option
              key={c.code}
              value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.address?.communeCode && (
          <p className="mt-1 text-sm text-red-600">
            {String(errors.address?.communeCode?.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Địa chỉ chi tiết
        </label>
        <input
          {...register('address.detailedAddress')}
          disabled={!watch('address.communeCode')}
          type="text"
          placeholder="Số nhà, tên đường..."
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.address?.detailedAddress
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />

        {errors.address?.detailedAddress && (
          <p className="mt-1 text-sm text-red-600">
            {String(errors.address?.detailedAddress?.message)}
          </p>
        )}
      </div>
    </div>
  );
};
