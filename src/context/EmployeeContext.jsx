import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { initialAttendance } from "../data/attendanceData";
import { initialEmployees, initialDepartments, initialLeaves } from "../data/initialData";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useLocalStorage("ems_employees", initialEmployees);
  const [departments, setDepartments] = useLocalStorage("ems_departments", initialDepartments);
  const [leaves, setLeaves] = useLocalStorage("ems_leaves", initialLeaves);
  const [attendance, setAttendance] = useLocalStorage("ems_attendance", initialAttendance);

  const addEmployee = (employee) => {
    const id = Date.now();
    const record = { ...employee, id, employeeId: `EMP${String(id).slice(-6)}` };
    setEmployees((current) => [...current, record]);
    return record;
  };

  const updateEmployee = (id, data) => setEmployees((current) =>
    current.map((item) => String(item.id) === String(id) ? { ...item, ...data } : item)
  );

  const deleteEmployee = (id) => {
    setEmployees((current) => current.filter((item) => String(item.id) !== String(id)));
    setAttendance((current) => current.filter((item) => String(item.employeeId) !== String(id)));
    // Leave requests are retained as history after an employee is removed.
  };

  const addDepartment = (data) => setDepartments((current) => [...current, { id: Date.now(), ...data }]);

  const updateDepartment = (id, data) => {
    const previous = departments.find((item) => String(item.id) === String(id));
    if (!previous) return;
    setDepartments((current) => current.map((item) =>
      String(item.id) === String(id) ? { ...item, ...data } : item
    ));
    if (previous.name !== data.name) {
      setEmployees((current) => current.map((employee) =>
        employee.department === previous.name ? { ...employee, department: data.name } : employee
      ));
    }
  };

  const deleteDepartment = (id) => {
    const department = departments.find((item) => String(item.id) === String(id));
    if (!department || employees.some((employee) => employee.department === department.name)) return false;
    setDepartments((current) => current.filter((item) => String(item.id) !== String(id)));
    return true;
  };

  const updateLeaveStatus = (id, status) => setLeaves((current) => current.map((item) =>
    String(item.id) === String(id) ? { ...item, status } : item
  ));

  const updateAttendance = (employeeId, date, data) => setAttendance((current) => {
    const existing = current.find((item) => String(item.employeeId) === String(employeeId) && item.date === date);
    if (existing) return current.map((item) => item.id === existing.id ? { ...item, ...data } : item);
    return [...current, { id: Date.now(), employeeId, date, ...data }];
  });

  const statistics = useMemo(() => ({
    totalEmployees: employees.length,
    activeEmployees: employees.filter((item) => item.status === "Active").length,
    inactiveEmployees: employees.filter((item) => item.status === "Inactive").length,
    totalDepartments: departments.length,
    pendingLeaves: leaves.filter((item) => item.status === "Pending").length
  }), [employees, departments, leaves]);

  const value = {
    employees, departments, leaves, attendance, statistics,
    addEmployee, updateEmployee, deleteEmployee,
    addDepartment, updateDepartment, deleteDepartment,
    updateLeaveStatus, updateAttendance,
    setEmployees, setDepartments, setLeaves, setAttendance
  };

  return <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>;
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployees must be used inside EmployeeProvider");
  return context;
}
