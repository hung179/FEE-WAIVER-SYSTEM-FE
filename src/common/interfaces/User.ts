export interface User {
  id: number;
  username: string;
  fullName: string;
  dateOfBirth: Date;
  accountStatus: 'ACTIVE' | 'INACTIVE';
  role: string;
  latestOrganization: any;
  updateAt: Date;
}
