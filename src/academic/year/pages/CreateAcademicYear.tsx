import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AcademicYearSchema } from '../schema/AcademicYearSchema';
import api from '../../../common/api/api';
import { useState } from 'react';
import { AcademicYearForm } from '../components/forms/AcademicYearForm';
import { useModal } from '../../../common/contexts/ModalContext';
import { useNavigate } from 'react-router-dom';

export type AcademicYearFormType = yup.InferType<typeof AcademicYearSchema>;

export default function CreateAcademicYear() {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const form = useForm<AcademicYearFormType>({
    resolver: yupResolver(AcademicYearSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split('T')[0] : null;

  async function onSubmit(data: AcademicYearFormType) {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    console.log('Dữ liệu gửi đi:', data);

    try {
      const res = await api.post(
        'academic/year',
        {
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (res.data.success) {
        openModal('CONFIRM', {
          title: 'Thông báo !',
          message: res.data.data,
          type: 'SUCCESS',
          onConfirm: () => navigate('/academics/year')
        });
      }
    } catch (error: any) {
      openModal('CONFIRM', {
          title: 'Thông báo !',
          message: error.response.data.data,
          type: 'ERROR',
        });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <AcademicYearForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        setSubmitMessage={setSubmitMessage}
      />
    </div>
  );
}
