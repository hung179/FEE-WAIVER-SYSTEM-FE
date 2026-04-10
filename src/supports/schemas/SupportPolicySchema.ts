import * as yup from 'yup';

export const SupportPolicySchema = yup.object({
  id: yup.number().notRequired(),
  name: yup
    .string()
    .required('Vui lòng nhập tên đối tượng')
    .min(4, 'Tên phải có ít nhất 4 ký tự')
    .max(20, 'Tên không được quá 20 ký tự'),
  type: yup
    .mixed<'TUITION' | 'EXPENSE'>()
    .required('Vui lòng chọn loại hỗ trợ')
    .oneOf(['TUITION', 'EXPENSE'], 'Loại hỗ trợ không hợp lệ'),
  percentage: yup.number().when('type', {
    is: 'TUITION',
    then: (schema) => schema.required('Phải nhập %').typeError('Phải là số'),
    otherwise: (schema) =>
      schema.transform((_, val) => (val === '' ? undefined : _)).nullable(),
  }),

  amount: yup.number().when('type', {
    is: 'EXPENSE',
    then: (schema) =>
      schema.required('Phải nhập số tiền').typeError('Phải là số'),
    otherwise: (schema) =>
      schema.transform((_, val) => (val === '' ? undefined : _)).nullable(),
  }),

  isDeleted: yup.boolean().default(false),
});
