import * as yup from 'yup';
import { OrganizationSchema } from '../schema/OrganizationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import api from '../../common/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrganizationById } from '../hooks/Organizations/useOrganizationById';
import { useEffect } from 'react';
import { UpdateOrganizationForm } from '../components/UpdateOrganizationForm';
import { useModal } from '../../common/contexts/ModalContext';
import { ConfirmModal } from '../../common/components/Modal/ConfirmModal';

export type OrganizationForm = yup.InferType<typeof OrganizationSchema>;

export default function UpdateOrganizationPage() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { id } = useParams<{ id: string }>();
  const { organization } = useOrganizationById(id);
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

  useEffect(() => {
    form.reset({
      managementLevel: organization?.managementLevel,
      organizationIds: organization?.organizationIds,
      email: organization?.email,
      address: {
        provinceCode: organization?.address.province.code,
        communeCode: organization?.address.commune.code,
        detailedAddress: organization?.address.detailedAddress,
      },
      phoneNumber: organization?.phoneNumber,
      organizationName: organization?.organizationName,
    });
  }, [id, organization]);

  async function onSubmit(data: OrganizationForm) {
    try {
      const res = await api.patch(`manage/organization/${id}`, data, {
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
      <UpdateOrganizationForm
        form={form}
        onSubmit={onSubmit}
      />
      <ConfirmModal />
    </div>
  );
}
