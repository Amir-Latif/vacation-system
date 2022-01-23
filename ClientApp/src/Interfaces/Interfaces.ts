export interface EmployeeProfile {
  id: number;
  name: string;
  jobTitle: string;
  hiringDate: Date;
  image: string;
  dateOfBirth: Date;
  mobile: number;
  email: string;
  address: string;
  totalCredit: number;
  usedCredit: number;
}

export interface EmployeeHistory {
  id : number,
  employeeId : number,
  from : string,
  to : string,
  vacationType : string,
  reason : string
}