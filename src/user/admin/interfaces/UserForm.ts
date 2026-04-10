export interface UserForm {
    username: string;
    password: string;
    fullName: string;
    dateOfBirth: {
        day: number;
        month: number;
        year: number;
    };
    accountStatus: 'ACTIVE' | 'INACTIVE';
    roleName: string;
    organizationIds: string;
}