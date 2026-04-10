import { yupResolver } from '@hookform/resolvers/yup';
import { AcademicYearSchema } from '../schema/AcademicYearSchema';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import api from '../../../common/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useAcademicYearById } from '../hooks/useAcademicYearById';
import { AcademicYearForm } from '../components/forms/AcademicYearForm';
import { useModal } from '../../../common/contexts/ModalContext';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';
import type { AcademicYearFormType } from './CreateAcademicYear';

export const UpdateAcademicYear = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const { id } = useParams<{ id: string }>();
  const { academicYear } = useAcademicYearById(id);
  const form = useForm<AcademicYearFormType>({
    resolver: yupResolver(AcademicYearSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      startDate: academicYear?.startDate,
      endDate: academicYear?.endDate,
    });
  }, [id, academicYear]);

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split('T')[0] : null;

  async function onSubmit(data: AcademicYearFormType) {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    console.log('Dữ liệu gửi đi:', data);

    try {
      const res = await api.put(
        `academic/year/${id}`,
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
      <ConfirmModal />
    </div>
  );
};
