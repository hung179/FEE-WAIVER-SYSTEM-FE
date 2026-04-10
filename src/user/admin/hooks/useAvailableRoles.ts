const roleOptions: Record<string, { value: string; label: string }[]> = {
  SCHOOL: [
    { value: 'HIEUTRUONG', label: 'Hiệu trưởng' },
    { value: 'CANBO', label: 'Cán bộ trường' },
  ],
  PROVINCIAL: [{ value: 'QUANLYCAP', label: 'Quản lý cấp' }],
};

export const useAvailableRoles = (orgId: string, organizations: any[]) => {
  if (!orgId) return [];

  const org: any = organizations.find((o) => o.id === Number(orgId));
  return roleOptions[org?.managementLevel] || [];
};
