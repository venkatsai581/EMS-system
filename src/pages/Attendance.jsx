
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search
} from "lucide-react";

import { useEmployees } from "../context/EmployeeContext";

function Attendance() {
  const { employees, attendance, updateAttendance } = useEmployees();

  const [selectedDate, setSelectedDate] = useState("2026-11-03");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get attendance records for the selected date
  const dailyAttendance = useMemo(() => {
    return employees.map((employee) => {
      const record = attendance.find(
        (item) =>
          String(item.employeeId) === String(employee.id) &&
          item.date === selectedDate
      );

      return {
        ...employee,
        attendanceStatus: record?.status || "Not Marked",
        checkIn: record?.checkIn || "--",
        checkOut: record?.checkOut || "--"
      };
    });
  }, [employees, attendance, selectedDate]);

  // Calculate attendance statistics
  const presentCount = dailyAttendance.filter(
    (item) => item.attendanceStatus === "Present"
  ).length;

  const absentCount = dailyAttendance.filter(
    (item) => item.attendanceStatus === "Absent"
  ).length;

  const lateCount = dailyAttendance.filter(
    (item) => item.attendanceStatus === "Late"
  ).length;

  const attendancePercentage =
    employees.length > 0
      ? Math.round((presentCount / employees.length) * 100)
      : 0;

  // Search and filter attendance records
  const filteredAttendance = dailyAttendance.filter((employee) => {
    const fullName =
      `${employee.firstName} ${employee.lastName}`.toLowerCase();

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      employee.attendanceStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Update employee attendance
  const handleStatusChange = (employeeId, status) => {
    const attendanceData = {
      status,
      checkIn:
        status === "Present" || status === "Late"
          ? status === "Late" ? "09:30 AM" : "09:00 AM"
          : "--",
      checkOut:
        status === "Present" || status === "Late"
          ? "06:00 PM"
          : "--"
    };

    updateAttendance(employeeId, selectedDate, attendanceData);
  };

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Monitor and manage employee attendance records.</p>
        </div>
      </div>

      {/* Date selection */}
      <div className="attendance-date-filter">
        <CalendarDays size={19} />
        <label htmlFor="attendance-date">Select Date:</label>
        <input
          id="attendance-date"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />
      </div>

      {/* Attendance statistics */}
      <div className="attendance-stats">
        <div className="attendance-stat-card">
          <div className="attendance-stat-icon total">
            <Users />
          </div>
          <div>
            <h3>{employees.length}</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon present">
            <CheckCircle />
          </div>
          <div>
            <h3>{presentCount}</h3>
            <p>Present</p>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon absent">
            <XCircle />
          </div>
          <div>
            <h3>{absentCount}</h3>
            <p>Absent</p>
          </div>
        </div>

        <div className="attendance-stat-card">
          <div className="attendance-stat-icon late">
            <Clock />
          </div>
          <div>
            <h3>{lateCount}</h3>
            <p>Late</p>
          </div>
        </div>
      </div>

      {/* Attendance percentage */}
      <div className="attendance-percentage-card">
        <div>
          <h3>Daily Attendance Percentage</h3>
          <p>Present employees out of total employees</p>
        </div>

        <h2>{attendancePercentage}%</h2>

        <div className="attendance-progress">
          <div
            className="attendance-progress-fill"
            style={{ width: `${attendancePercentage}%` }}
          />
        </div>
      </div>

      {/* Search and status filter */}
      <div className="attendance-toolbar">
        <div className="attendance-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Not Marked">Not Marked</option>
        </select>
      </div>

      {/* Attendance table */}
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    {employee.firstName} {employee.lastName}
                  </td>

                  <td>{employee.employeeId}</td>
                  <td>{employee.department}</td>
                  <td>{employee.checkIn}</td>
                  <td>{employee.checkOut}</td>

                  <td>
                    <span
                      className={`attendance-status ${employee.attendanceStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {employee.attendanceStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={employee.attendanceStatus}
                      onChange={(event) =>
                        handleStatusChange(employee.id, event.target.value)
                      }
                    >
                      <option value="Not Marked">Not Marked</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="attendance-empty">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
