import { yupResolver } from '@hookform/resolvers/yup';
import { ConfirmModal } from '../../common/components/Modal/ConfirmModal';
import { CreateBeneficiaryForm } from '../components/CreateBeneficiaryForm';
import { BeneficiarySchema } from '../schemas/BeneficiarySchema';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';
import { useModal } from '../../common/contexts/ModalContext';
import api from '../../common/api/api';
import { useNavigate } from 'react-router-dom';

export type BeneficiaryFormType = yup.InferType<typeof BeneficiarySchema>;

export const CreateSupport = () => {
  const navigate = useNavigate();

  const form = useForm<BeneficiaryFormType>({
    resolver: yupResolver(BeneficiarySchema),
    defaultValues: {
      name: '',
      description: '',
      supportPolicyRequest: [],
      isDeleted: false
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const { openModal } = useModal();

  const onSubmit = async (data: BeneficiaryFormType) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    console.log('Dữ liệu gửi đi:', data);

    try {
      const res = await api.post('beneficiaries', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.success) {
        openModal('CONFIRM', {
          title: 'Thông báo !',
          message: res.data.data,
          type: 'SUCCESS',
          onConfirm: () => navigate('/supports'),
        });
      }
    } catch (error: any) {
      console.error(error);
      openModal('CONFIRM', {
        title: 'Thông báo !',
        message: error.response.data.data,
        type: 'ERROR',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <CreateBeneficiaryForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        setSubmitMessage={setSubmitMessage}
      />
      <ConfirmModal />
    </div>
  );
};
