import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../../common/api/api';
import { UserSchema } from '../schema/UserSchema';
import type { UserForm } from '../interfaces/UserForm';
import { CreateUserForm } from '../components/forms/CreateUserForm';
import { useAvailableRoles } from '../hooks/useAvailableRoles';
import { useOrganizations } from '../hooks/useOrganizaiton';
import { useModal } from '../../../common/contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';

export default function CreateUserPage() {
  const { organizations } = useOrganizations();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const { openModal } = useModal();
  const navigate = useNavigate();

  const form = useForm<UserForm>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      username: '',
      password: '',
      fullName: '',
      dateOfBirth: {
        day: 1,
        month: 1,
        year: 1900,
      },
      accountStatus: undefined,
      roleName: '',
      organizationIds: '',
    },
  });

  const orgId = form.watch('organizationIds');
  const [availableRoles, setAvailableRoles] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    setAvailableRoles(useAvailableRoles(orgId, organizations));
    console.log(availableRoles);
  }, [orgId]);

  async function onSubmit(data: UserForm) {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    const user = {
      ...data,
      organizationIds: data.organizationIds
        ? data.organizationIds.split(',').map((id: string) => Number(id.trim()))
        : [],
    };

    try {
      const res = await api.post('/user/information/create', user);
      if (res.data.success) {
        openModal('CONFIRM', {
          title: 'Thông báo !',
          message: res.data.data,
          type: 'SUCCESS',
          onConfirm: () => navigate('/users'),
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
      <CreateUserForm
        form={form}
        organizations={organizations}
        availableRoles={availableRoles}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        setSubmitMessage={setSubmitMessage}
      />
      <ConfirmModal />
    </div>
  );
}
