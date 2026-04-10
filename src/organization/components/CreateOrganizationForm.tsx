import { FormProvider, type UseFormReturn } from 'react-hook-form';

import OrganizationLevel from './OrganizationLevel';
import { OrganizationSchema } from '../schema/OrganizationSchema';
import { BaseInformation } from './BaseInformation';
import * as yup from 'yup';
import { AddressForm } from './Address';
import { useModal } from '../../common/contexts/ModalContext';

export type OrganizationForm =
  yup.InferType<typeof OrganizationSchema>;

interface CreateOrganizationFormProps {
  form: UseFormReturn<OrganizationForm>;
  onSubmit: (data: OrganizationForm) => void | Promise<void>;
}

export const CreateOrganizationForm : React.FC<CreateOrganizationFormProps> = ({form,
   onSubmit
}) => {
  
  const { openModal } = useModal();

  const { handleSubmit } = form;

  const detailedAddress = form.watch('address.detailedAddress');
  const commune = form.watch('address.communeCode');
  const province = form.watch('address.provinceCode');
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6">
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Tổ chức quản lý
            </h1>
          </div>
          <BaseInformation />
        </div>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          <AddressForm />
        </div>
        {detailedAddress?.trim() && !!commune && !!province && (
          <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
            <OrganizationLevel />
          </div>
        )}
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
          <button
          type='button'
            onClick={() =>
                openModal('CONFIRM', {
                  title: 'Cập nhật tổ chức',
                  message: 'Bạn có chắc muốn cập nhật?',
                  type: 'CONFIRM',
                  onConfirm: () => form.handleSubmit(onSubmit)(),
                })
              }
            className="rounded-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
            Tạo
          </button>
          <button
            type="button"
            onClick={() => {
              form.reset();
            }}
            className="ml-4 flex-1 rounded-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
            Xóa Form
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
