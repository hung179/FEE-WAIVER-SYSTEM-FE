import type { Address } from './Address';

export interface Organization {
  id: number;
  managementLevel: string;
  organizationIds: number[];
  email: string;
  address: Address;
  phoneNumber: string;
  organizationName: string;
  children: Organization[];
  updateAt: Date;
}
