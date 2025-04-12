export type EmployeeData = {
  employeeID: string;
  nationality?: string;
  maritalStatus?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  dateOfBirth?: string;
  gender?: string;
};

export const employeeTestData: EmployeeData[] = [
  {
    employeeID: '0020',
    nationality: 'Nepalese',
    maritalStatus: 'Single',
    licenseNumber: 'DL123456789',
    licenseExpiry: '2025-11-15',
    dateOfBirth: '1998-01-01',
    gender: 'Female',
  },
];
