
/*
  INITIAL EMPLOYEE DATA

  This file contains demo employee records.
  These records will be loaded when the application
  runs for the first time.
*/

export const initialEmployees = [
  {
    id: 1,
    employeeId: "EMP001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul@company.com",
    phone: "9876543210",
    gender: "Male",
    department: "Development",
    designation: "Frontend Developer",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2024-01-15",
    salary: 45000,
    address: "Hyderabad, Telangana"
  },
  {
    id: 2,
    employeeId: "EMP002",
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya@company.com",
    phone: "9876543211",
    gender: "Female",
    department: "HR",
    designation: "HR Executive",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2023-06-20",
    salary: 38000,
    address: "Secunderabad, Telangana"
  },
  {
    id: 3,
    employeeId: "EMP003",
    firstName: "Arjun",
    lastName: "Kumar",
    email: "arjun@company.com",
    phone: "9876543212",
    gender: "Male",
    department: "Design",
    designation: "UI/UX Designer",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2024-03-10",
    salary: 42000,
    address: "Miyapur, Hyderabad"
  },
  {
    id: 4,
    employeeId: "EMP004",
    firstName: "Sneha",
    lastName: "Patel",
    email: "sneha@company.com",
    phone: "9876543213",
    gender: "Female",
    department: "Finance",
    designation: "Accountant",
    employmentType: "Full Time",
    status: "Inactive",
    joiningDate: "2022-09-05",
    salary: 40000,
    address: "Kukatpally, Hyderabad"
  },
  {
    id: 5,
    employeeId: "EMP005",
    firstName: "Kiran",
    lastName: "Rao",
    email: "kiran@company.com",
    phone: "9876543214",
    gender: "Male",
    department: "Development",
    designation: "Backend Developer",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2023-11-12",
    salary: 50000,
    address: "Madhapur, Hyderabad"
  },
  {
    id: 6,
    employeeId: "EMP006",
    firstName: "Ananya",
    lastName: "Reddy",
    email: "ananya@company.com",
    phone: "9876543215",
    gender: "Female",
    department: "Marketing",
    designation: "Marketing Executive",
    employmentType: "Part Time",
    status: "Active",
    joiningDate: "2024-05-18",
    salary: 30000,
    address: "Gachibowli, Hyderabad"
  },
  {
    id: 7,
    employeeId: "EMP007",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram@company.com",
    phone: "9876543216",
    gender: "Male",
    department: "Sales",
    designation: "Sales Manager",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2022-04-22",
    salary: 55000,
    address: "Kondapur, Hyderabad"
  },
  {
    id: 8,
    employeeId: "EMP008",
    firstName: "Meghana",
    lastName: "Das",
    email: "meghana@company.com",
    phone: "9876543217",
    gender: "Female",
    department: "Development",
    designation: "React Developer",
    employmentType: "Contract",
    status: "Active",
    joiningDate: "2025-01-08",
    salary: 46000,
    address: "Nizampet, Hyderabad"
  },
  {
    id: 9,
    employeeId: "EMP009",
    firstName: "Sandeep",
    lastName: "Varma",
    email: "sandeep@company.com",
    phone: "9876543218",
    gender: "Male",
    department: "HR",
    designation: "HR Manager",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2021-08-14",
    salary: 60000,
    address: "Begumpet, Hyderabad"
  },
  {
    id: 10,
    employeeId: "EMP010",
    firstName: "Divya",
    lastName: "Shah",
    email: "divya@company.com",
    phone: "9876543219",
    gender: "Female",
    department: "Design",
    designation: "Graphic Designer",
    employmentType: "Full Time",
    status: "Active",
    joiningDate: "2024-07-01",
    salary: 35000,
    address: "Hitech City, Hyderabad"
  }
];

// Initial department data
export const initialDepartments = [
  { id: 1, name: "Development", description: "Software development team" },
  { id: 2, name: "HR", description: "Human resources team" },
  { id: 3, name: "Design", description: "UI and graphic design team" },
  { id: 4, name: "Finance", description: "Finance and accounts team" },
  { id: 5, name: "Marketing", description: "Marketing and promotions team" },
  { id: 6, name: "Sales", description: "Sales and business team" }
];

// Initial leave request data
export const initialLeaves = [
{
    id: 1,
    employeeId: 1,
    leaveType: "Casual Leave",
    startDate: "2026-11-10",
    endDate: "2026-11-11",
    reason: "Personal work",
    status: "Pending"
  },
  {
    id: 2,
    employeeId: 2,
    leaveType: "Sick Leave",
    startDate: "2026-11-05",
    endDate: "2026-11-06",
    reason: "Health reasons",
    status: "Approved"
  },
  {
    id: 3,
    employeeId: 3,
    leaveType: "Annual Leave",
    startDate: "2026-11-15",
    endDate: "2026-11-18",
    reason: "Family vacation",
    status: "Pending"
  },
  {
  id: 4,
  employeeId: 4,
  leaveType: "Casual Leave",
  startDate: "2026-11-12",
  endDate: "2026-11-13",
  reason: "Attending a family function",
  status: "Pending"
},
{
  id: 5,
  employeeId: 5,
  leaveType: "Sick Leave",
  startDate: "2026-11-07",
  endDate: "2026-11-08",
  reason: "Fever and rest",
  status: "Approved"
},
{
  id: 6,
  employeeId: 6,
  leaveType: "Annual Leave",
  startDate: "2026-11-20",
  endDate: "2026-11-24",
  reason: "Family vacation",
  status: "Rejected"
},
{
  id: 7,
  employeeId: 7,
  leaveType: "Work From Home",
  startDate: "2026-11-09",
  endDate: "2026-11-09",
  reason: "Personal appointment",
  status: "Pending"
},
{
  id: 8,
  employeeId: 8,
  leaveType: "Casual Leave",
  startDate: "2026-11-17",
  endDate: "2026-11-18",
  reason: "Personal work",
  status: "Approved"
}
];
