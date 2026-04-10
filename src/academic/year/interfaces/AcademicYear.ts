import type { AcademicTerm } from '../../term/interfaces/AcademicTerm';

export interface AcademicYear {
  id: number;
  startDate: Date;
  endDate: Date;
  updateAt: Date;
  academicYearStatus: string;
  academicTerm: AcademicTerm;
}
