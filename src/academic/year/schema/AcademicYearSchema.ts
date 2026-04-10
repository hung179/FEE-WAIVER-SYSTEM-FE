import * as yup from 'yup';

export const AcademicYearSchema = yup.object({
  startDate: yup
    .date()
    .required('Vui lòng nhập năm bắt đầu')
    .min(new Date('2000-01-01'), 'Năm bắt đầu phải từ 2000 trở lên')
    .max(new Date('2100-12-31'), 'Năm bắt đầu không hợp lệ')
    .typeError('Vui lòng nhập số hợp lệ'),
  endDate: yup
    .date()
    .required('Vui lòng nhập năm kết thúc')
    .min(new Date('2000-01-01'), 'Năm bắt đầu phải từ 2000 trở lên')
    .max(new Date('2100-12-31'), 'Năm bắt đầu không hợp lệ')
    .test(
      'is-greater',
      'Năm kết thúc phải lớn hơn năm bắt đầu',
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return value > startDate;
      },
    )
    .typeError('Vui lòng chọn ngày hợp lệ'),
});
