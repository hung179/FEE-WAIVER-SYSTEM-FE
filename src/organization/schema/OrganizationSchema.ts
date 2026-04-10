import * as yup from 'yup';

export const OrganizationSchema = yup.object({
  organizationName: yup.string().required('Vui lòng nhập tên tổ chức'),
  managementLevel: yup.string().required('Vui lòng chọn cấp tổ chức.'),
  email: yup.string().required('Vui lòng nhập địa chỉ email tổ chức.'),
  phoneNumber: yup.string().required('Vui lòng nhập thông tin số điện thoại.'),
  address: yup.object({
    provinceCode: yup.string().required('Vui lòng chọn Tỉnh/Thành phố.'),
    communeCode: yup.string().required('Vui lòng chọn Xã/Phường.'),
    detailedAddress: yup.string().required('Vui lòng nhập địa chỉ chi tiết.'),
  }),
  organizationIds: yup.array().defined(),
});
