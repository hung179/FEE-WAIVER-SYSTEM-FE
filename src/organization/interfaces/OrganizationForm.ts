import type { Address } from './Address';

export interface OrganizationForm {
  managementLevel: string;
  organizationId: number[];
  email: string;
  address: Address;
  phoneNumber: string;
  organizationName: string;
}
