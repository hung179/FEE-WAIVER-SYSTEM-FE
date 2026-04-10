import * as yup from 'yup';
import { CreateOrganizationForm } from '../components/CreateOrganizationForm';
import { OrganizationSchema } from '../schema/OrganizationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import api from '../../common/api/api';
import { ConfirmModal } from '../../common/components/Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../common/contexts/ModalContext';

export type OrganizationForm = yup.InferType<typeof OrganizationSchema>;

export default function CreateOrganizationPage() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const form = useForm<OrganizationForm>({
    resolver: yupResolver(OrganizationSchema),
    defaultValues: {
      managementLevel: '',
      organizationIds: [],
      email: '',
      address: {
        provinceCode: '',
        communeCode: '',
        detailedAddress: '',
      },
      phoneNumber: '',
      organizationName: '',
    },
  });

  async function onSubmit(data: OrganizationForm) {
    try {
      const res = await api.post('manage/organization', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data.success) {
        openModal('CONFIRM', {
          title: 'Thông báo !',
          message: res.data.data,
          type: 'SUCCESS',
          onConfirm: () => navigate('/organizations'),
        });
      }
    } catch (error: any) {
      openModal('CONFIRM', {
        title: 'Thông báo !',
        message: error.response.data.data,
        type: 'ERROR',
      });
    }
  }
  return (
    <div>
      <CreateOrganizationForm
        form={form}
        onSubmit={onSubmit}
      />
      <ConfirmModal />
    </div>
  );
}
