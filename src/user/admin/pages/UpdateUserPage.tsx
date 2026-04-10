import { useEffect, useState } from 'react';
import { UpdateUserForm } from '../components/forms/UpdateUserForm';
import { useAvailableRoles } from '../hooks/useAvailableRoles';
import { useForm } from 'react-hook-form';
import type { UserForm } from '../interfaces/UserForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserSchema } from '../schema/UserSchema';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../common/api/api';
import { useUser } from '../../../common/hooks/useUser';
import { useOrganizations } from '../hooks/useOrganizaiton';
import { useModal } from '../../../common/contexts/ModalContext';
import { ConfirmModal } from '../../../common/components/Modal/ConfirmModal';

export const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();

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

  const { id } = useParams<{ id: string }>();
  const { organizations } = useOrganizations();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const { user } = useUser(id);

  const orgId = form.watch('organizationIds');
  const [availableRoles, setAvailableRoles] = useState<
    { value: string; label: string }[]
  >([]);
  useEffect(() => {
    async function fetchRoles() {
      const availableRoles = useAvailableRoles(orgId, organizations);
      setAvailableRoles(availableRoles);
    }
    fetchRoles();
  }, [orgId, organizations]);


  useEffect(() => {
    if (!user) return;

    const dob = new Date(user.dateOfBirth);

    form.reset({
      username: user.username,
      fullName: user.fullName,
      dateOfBirth: {
        day: dob.getDate(),
        month: dob.getMonth() + 1,
        year: dob.getFullYear(),
      },
      accountStatus: user.accountStatus,
      organizationIds: user?.latestOrganization.id,
      roleName: user.role,
    });
  }, [user]);

  async function onSubmit(data: UserForm) {
    console.log('click');
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    const user = {
      ...data,
      organizationIds: data.organizationIds
        ? data.organizationIds.split(',').map((id: string) => Number(id.trim()))
        : [],
    };

    console.log('Dữ liệu gửi đi:', user);

    try {
      const res = await api.patch(`/user/information/update`, user);
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
      <UpdateUserForm
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
};
