export class Employee {
    constructor(
        public employeeId: string,
        public ssn: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public sex: string,
        public dob: string,
        public salary: number,
        public bonus: number,
        public jobType: string,
    ) {}
}
