import React, { useEffect, useState } from 'react';
import { CreateBeneficiaryForm } from '../components/CreateBeneficiaryForm';
import { ConfirmModal } from '../../common/components/Modal/ConfirmModal';
import { BeneficiarySchema } from '../schemas/BeneficiarySchema';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal } from '../../common/contexts/ModalContext';
import api from '../../common/api/api';
import { useBeneficiaryById } from '../hooks/useBeneficiaryById';
import { useMutation } from '@tanstack/react-query';

export type BeneficiaryFormType = yup.InferType<typeof BeneficiarySchema>;

export const UpdateSupport = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: beneficiary } = useBeneficiaryById(id);

  const form = useForm<BeneficiaryFormType>({
    resolver: yupResolver(BeneficiarySchema),
    defaultValues: {
      name: '',
      description: '',
      supportPolicyRequest: [],
    },
  });

  useEffect(() => {
    form.reset({
      name: beneficiary?.name,
      description: beneficiary?.description,
      supportPolicyRequest: beneficiary?.supportPolicyResponse.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type as 'TUITION' | 'EXPENSE',
        percentage: p.percentage ?? undefined,
        amount: p.amount ?? undefined,
        isDeleted: false,
      })),
    });
  }, [id, beneficiary]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const { openModal } = useModal();

  
  const onSubmit = async (data: BeneficiaryFormType) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    console.log('RAW FORM:', form.getValues());
    console.log('SUBMIT DATA:', data);

    try {
      const res = await api.put(`beneficiaries/${id}`, data, {
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
