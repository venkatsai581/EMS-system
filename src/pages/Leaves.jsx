
import { useMemo, useState } from "react";
import {
  Search, CalendarDays, CheckCircle, XCircle, Clock
} from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";

function Leaves() {
  const { leaves, employees, updateLeaveStatus } = useEmployees();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get employee name using employee ID
  const getEmployeeName = (leave) => {
    const employee = employees.find(
      (item) =>
        String(item.id) === String(leave.employeeId) ||
        item.employeeId === leave.employeeId
    );

    return employee
      ? `${employee.firstName} ${employee.lastName}`
      : "Unknown Employee";
  };

  // Filter leave requests
  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const employeeName = getEmployeeName(leave);

      const matchesSearch = employeeName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        leave.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [leaves, employees, search, statusFilter]);

  const pendingCount = leaves.filter(
    (leave) => leave.status.toLowerCase() === "pending"
  ).length;

  const approvedCount = leaves.filter(
    (leave) => leave.status.toLowerCase() === "approved"
  ).length;

  const rejectedCount = leaves.filter(
    (leave) => leave.status.toLowerCase() === "rejected"
  ).length;

  // Approve or reject a leave request
  const handleStatusChange = (leave, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to ${newStatus.toLowerCase()} this leave request?`
      )
    ) {
      updateLeaveStatus(leave.id, newStatus);
    }
  };

  return (
    <div className="leaves-page">
      <div className="leaves-header">
        <div>
          <h1>Leave Management</h1>
          <p>Review and manage employee leave requests.</p>
        </div>
      </div>

      {/* Leave statistics */}
      <div className="leave-stats-grid">
        <div className="leave-stat-card">
          <div className="leave-stat-icon pending-icon">
            <Clock />
          </div>
          <div>
            <h3>{pendingCount}</h3>
            <p>Pending Requests</p>
          </div>
        </div>

        <div className="leave-stat-card">
          <div className="leave-stat-icon approved-icon">
            <CheckCircle />
          </div>
          <div>
            <h3>{approvedCount}</h3>
            <p>Approved Requests</p>
          </div>
        </div>

        <div className="leave-stat-card">
          <div className="leave-stat-icon rejected-icon">
            <XCircle />
          </div>
          <div>
            <h3>{rejectedCount}</h3>
            <p>Rejected Requests</p>
          </div>
        </div>

        <div className="leave-stat-card">
          <div className="leave-stat-icon total-icon">
            <CalendarDays />
          </div>
          <div>
            <h3>{leaves.length}</h3>
            <p>Total Requests</p>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="leave-toolbar">
        <div className="leave-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search employee name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Leave requests table */}
      <div className="leave-table-container">
        <table className="leave-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{getEmployeeName(leave)}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>

                  <td>
                    <span
                      className={`leave-status ${leave.status.toLowerCase()}`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td>
                    {leave.status.toLowerCase() === "pending" ? (
                      <div className="leave-action-buttons">
                        <button
                          className="approve-btn"
                          title="Approve"
                          onClick={() =>
                            handleStatusChange(leave, "Approved")
                          }
                        >
                          <CheckCircle size={16} />
                        </button>

                        <button
                          className="reject-btn"
                          title="Reject"
                          onClick={() =>
                            handleStatusChange(leave, "Rejected")
                          }
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="leave-completed">
                        No action required
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="leave-empty">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaves;
