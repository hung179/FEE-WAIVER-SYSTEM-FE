import * as yup from 'yup';

export const LoginSchema = yup.object({
  username: yup.string().required('Vui lòng nhập tên tài khoản'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});
