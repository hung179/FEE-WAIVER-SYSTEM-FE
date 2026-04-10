import * as yup from 'yup';

export const AcademicTermSchema = yup.object({
  startDate: yup.date().required('Vui lòng nhập thời gian bắt đầu học kỳ'),
  endDate: yup.date().required('Vui lòng nhập thời gian bắt đầu học kỳ'),
  academicYearId: yup.string().required('Vui lòng thêm năm học.'),
});
