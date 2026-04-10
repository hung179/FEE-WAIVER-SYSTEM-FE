import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { AcademicTermSchema } from '../schema/AcademicTerm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAcademicYearById } from '../../year/hooks/useAcademicYearById';
import { AcademicTermForm } from '../components/AcademicTermForm';
import { useEffect, useState } from 'react';
import api from '../../../common/api/api';
import { useAcademicTermByYearId } from '../hooks/useAcademicTermByYearId';
import { useModal } from '../../../common/contexts/ModalContext';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';

export type AcademicTermFormType = yup.InferType<typeof AcademicTermSchema>;

export const CreateAcademicTerm = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { yearId } = useParams<{ yearId: string }>();
  const yearIdNumber = Number(yearId);
  const form = useForm<AcademicTermFormType>({
    resolver: yupResolver(AcademicTermSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      academicYearId: yearId,
    },
  });
  const { academicYear } = useAcademicYearById(yearId);
  const { data: academicTerms } = useAcademicTermByYearId(yearIdNumber);

  const sortedTerms = [...(academicTerms ?? [])].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  const minDate = sortedTerms.at(-1)?.endDate || academicYear?.startDate;
  const maxDate = academicYear?.endDate;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const formatDate = (date: Date | null) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data: AcademicTermFormType) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    console.log('Dữ liệu gửi đi:', data);

    try {
      const res = await api.post(
        'academic/year/term',
        {
          startDate: formatDate(data.startDate),
          endDate: formatDate(data.endDate),
          academicYearId: data.academicYearId
            ? Number(data.academicYearId)
            : undefined,
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
          onConfirm: () => navigate('/academics/year'),
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
  };

  return (
    <div>
      <AcademicTermForm
        minDate={minDate}
        maxDate={maxDate}
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
