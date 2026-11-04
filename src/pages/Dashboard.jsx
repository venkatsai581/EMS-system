
import {
  Users,
  UserCheck,
  Building2,
  CalendarDays
} from "lucide-react";

import { useEmployees } from "../context/EmployeeContext";

function Dashboard() {

  // Get shared application data
  const { employees, statistics } = useEmployees();

  // Dynamic dashboard statistics
  const stats = [
    {
      title: "Total Employees",
      value: statistics.totalEmployees,
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Employees",
      value: statistics.activeEmployees,
      icon: UserCheck,
      color: "green"
    },
    {
      title: "Departments",
      value: statistics.totalDepartments,
      icon: Building2,
      color: "purple"
    },
    {
      title: "Leave Requests",
      value: statistics.pendingLeaves,
      icon: CalendarDays,
      color: "orange"
    }
  ];

  // Get latest five employees
  const recentEmployees = [...employees]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="dashboard-page">

      {/* Dashboard heading */}
      <div className="page-heading">
        <div>
          <h1>Dashboard Overview</h1>
          <p>
            Welcome back! Here is your employee management overview.
          </p>
        </div>
      </div>

      {/* Statistics cards */}
      <div className="stats-grid">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className="stat-card" key={item.title}>
              <div className={`stat-icon ${item.color}`}>
                <Icon size={24} />
              </div>

              <div>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent employee records */}
      <div className="recent-section">
        <div className="section-heading">
          <div>
            <h2>Recent Employees</h2>
            <p>Latest employee records in the system</p>
          </div>
        </div>

        {recentEmployees.length > 0 ? (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>{employee.department}</td>
                    <td>{employee.designation}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          employee.status.toLowerCase()
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No employee records available.</p>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
