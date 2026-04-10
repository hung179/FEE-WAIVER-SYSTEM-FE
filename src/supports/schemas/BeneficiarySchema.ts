import * as yup from 'yup';
import { SupportPolicySchema } from './SupportPolicySchema';

export const BeneficiarySchema = yup.object({
  name: yup
    .string()
    .required('Vui lòng nhập tên đối tượng')
    .min(4, 'Tên phải có ít nhất 4 ký tự')
    .max(20, 'Tên không được quá 20 ký tự'),
  description: yup.string().required('Vui lòng nhập mô tả đối tượng'),
  supportPolicyRequest: yup
    .array()
    .of(SupportPolicySchema)
    .min(1, 'Phải có ít nhất 1 chính sách')
    .required('Vui lòng nhập ít nhất 1 chính sách cho đối tượng'),
  isDeleted: yup.boolean().notRequired().default(false)
});
