import * as yup from 'yup';

export const UserSchema = yup.object({
  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(4, 'Tên đăng nhập phải có ít nhất 4 ký tự')
    .max(20, 'Tên đăng nhập không được quá 20 ký tự')
    .matches(
      /^[a-zA-Z0-9_.-]+$/,
      'Tên đăng nhập chỉ được chứa chữ cái, số, dấu chấm, gạch dưới và gạch ngang',
    ),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(20, 'Mật khẩu không được quá 20 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt',
    ),
  fullName: yup
    .string()
    .required('Vui lòng nhập họ và tên')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
    .max(50, 'Họ và tên không được quá 50 ký tự')
    .matches(/^[\p{L} ]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
  dateOfBirth: yup
    .mixed<{
      day: number;
      month: number;
      year: number;
    }>()
    .transform((value) => {
      if (value?.day && value?.month && value?.year) {
        return new Date(value.year, value.month - 1, value.day);
      }
      return value;
    })
    .required('Vui lòng chọn ngày sinh')
    .test(
      'valid-date',
      'Ngày sinh không hợp lệ',
      (val) => val instanceof Date && !isNaN(val.getTime()),
    )
    .typeError('Ngày sinh không hợp lệ'),
  accountStatus: yup
    .mixed<'ACTIVE' | 'INACTIVE'>()
    .required('Vui lòng chọn trạng thái tài khoản')
    .oneOf(['ACTIVE', 'INACTIVE'], 'Trạng thái không hợp lệ'),
  roleName: yup
    .string()
    .required('Vui lòng nhập tên vai trò')
    .matches(
      /^[A-Z_]+$/,
      'Tên vai trò phải viết hoa và có thể chứa dấu gạch dưới (VD: ADMIN_USER)',
    ),
  organizationIds: yup
    .string()
    .required('Vui lòng chọn tổ chức')
    .matches(/^\d+$/, 'ID tổ chức phải là số'),
});
