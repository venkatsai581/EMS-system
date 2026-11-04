
import { useEffect,useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  Users
} from "lucide-react";

import { useEmployees } from "../context/EmployeeContext";
import EmployeeForm from "../components/employees/EmployeeForm";

function Employees() {

  const {
    employees,
    departments,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployees();

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Search, filter and sort employee records
  const filteredEmployees = useMemo(() => {

    let result = employees.filter((employee) => {

      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" ||
        employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Sorting employee records
    result.sort((a, b) => {

      if (sortBy === "name") {
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      }

      if (sortBy === "joiningDate") {
        return new Date(b.joiningDate) - new Date(a.joiningDate);
      }

      if (sortBy === "salary") {
        return b.salary - a.salary;
      }

      return 0;
    });

    return result;

  }, [employees, search, departmentFilter, statusFilter, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredEmployees.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Keep the current page valid after deleting or filtering records
useEffect(() => {
  if (currentPage > Math.max(totalPages, 1)) {
    setCurrentPage(Math.max(totalPages, 1));
  }
}, [currentPage, totalPages]);

  // Reset pagination when filters change
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    if (value) setSearchParams({ search: value }, { replace: true });
    else setSearchParams({}, { replace: true });
  };

  // Open add employee form
  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  // Open edit employee form
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Sync global search and open edit form when returning from a profile page.
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const editId = location.state?.editEmployeeId;
    if (!editId) return;
    const record = employees.find((item) => String(item.id) === String(editId));
    if (record) {
      setEditingEmployee(record);
      setShowForm(true);
    }
    navigate(location.pathname, { replace: true, state: null });
  }, [location.state, employees, navigate, location.pathname]);

  // Save employee record
  const handleSave = (data) => {

    // Check duplicate email
    const duplicateEmail = employees.some(
      (employee) =>
        employee.email.toLowerCase() === data.email.toLowerCase() &&
        employee.id !== editingEmployee?.id
    );

    if (duplicateEmail) {
      alert("An employee with this email already exists.");
      return;
    }

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }

    setShowForm(false);
    setEditingEmployee(null);
  };

  // Confirm and delete employee
  const handleDelete = () => {
    if (!deleteTarget) return;

    deleteEmployee(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="employees-page">

      {/* Page heading */}
      <div className="page-heading">
        <div>
          <h1>Employee Directory</h1>
          <p>Manage and organize all employee records.</p>
        </div>

        <button className="primary-btn" onClick={handleAdd}>
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employee count */}
      <div className="employee-count">
        <strong>{employees.length}</strong> Total Employees
      </div>

      {/* Search and filters */}
      <div className="employee-toolbar">

        <div className="employee-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Departments</option>

          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="joiningDate">Newest Joining</option>
          <option value="salary">Highest Salary</option>
        </select>

      </div>

      {/* Employee table */}
      <div className="employee-table-card">

        <div className="table-wrapper">

          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedEmployees.map((employee) => (

                <tr key={employee.id}>

                  <td>
                    <div className="employee-name">
                      <div className="employee-avatar">
                        {employee.firstName.charAt(0)}
                        {employee.lastName.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {employee.firstName} {employee.lastName}
                        </strong>
                        <span>{employee.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{employee.employeeId}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

                  <td>
                    {new Date(employee.joiningDate).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        title="View employee"
                        onClick={() => navigate(`/employees/${employee.id}`)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        title="Edit employee"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete employee"
                        className="delete-action"
                        onClick={() => setDeleteTarget(employee)}
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

              {/* Empty state */}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <Users size={35} />
                      <h3>No Employees Found</h3>
                      <p>Try changing your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>

        {/* Pagination */}
        <div className="pagination">

          <p>
            Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1}
            {" - "}
            {Math.min(startIndex + itemsPerPage, filteredEmployees.length)}
            {" of "}
            {filteredEmployees.length} employees
          </p>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            <span>{currentPage} / {Math.max(totalPages, 1)}</span>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>

        </div>

      </div>

      {/* Add and edit modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content employee-modal">

            <div className="modal-header">
              <div>
                <h2>
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <p>Enter employee information below.</p>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <EmployeeForm
              employee={editingEmployee}
              onSubmit={handleSave}
              onCancel={() => setShowForm(false)}
            />

          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="confirm-modal">

            <h2>Delete Employee?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteTarget.firstName} {deleteTarget.lastName}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="form-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={handleDelete}
              >
                Delete Employee
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Employees;
