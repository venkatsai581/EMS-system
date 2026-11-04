
import { useState } from "react";
import {
  Plus, Search, Pencil, Trash2, Building2, Users
} from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";

function Departments() {
  const {
    departments,
    employees,
    addDepartment,
    updateDepartment,
    deleteDepartment
  } = useEmployees();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Filter departments using the search input
  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  // Open the form for adding a department
  const openAddModal = () => {
    setEditingDepartment(null);
    setName("");
    setDescription("");
    setError("");
    setShowModal(true);
  };

  // Open the form with existing department details
  const openEditModal = (department) => {
    setEditingDepartment(department);
    setName(department.name);
    setDescription(department.description || "");
    setError("");
    setShowModal(true);
  };

  // Save a new department or update an existing one
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Department name is required.");
      return;
    }

    const duplicate = departments.some(
      (department) =>
        department.name.toLowerCase() === trimmedName.toLowerCase() &&
        department.id !== editingDepartment?.id
    );

    if (duplicate) {
      setError("This department already exists.");
      return;
    }

    const departmentData = {
      name: trimmedName,
      description: description.trim()
    };

    if (editingDepartment) {
      updateDepartment(editingDepartment.id, departmentData);
    } else {
      addDepartment(departmentData);
    }

    setShowModal(false);
  };

  // Delete a department after confirmation
  const handleDelete = (department) => {
    const employeeCount = employees.filter(
      (employee) => employee.department === department.name
    ).length;

    if (employeeCount > 0) {
      alert(
        `Cannot delete ${department.name}. ${employeeCount} employee(s) are assigned to it.`
      );
      return;
    }

    if (window.confirm(`Delete ${department.name} department?`)) {
      deleteDepartment(department.id);
    }
  };

  return (
    <div className="departments-page">
      <div className="department-page-header">
        <div>
          <h1>Departments</h1>
          <p>Manage your organization's departments.</p>
        </div>

        <button className="add-department-btn" onClick={openAddModal}>
          <Plus size={18} />
          Add Department
        </button>
      </div>

      <div className="department-summary">
        <div className="department-summary-card">
          <Building2 />
          <div>
            <h3>{departments.length}</h3>
            <p>Total Departments</p>
          </div>
        </div>

        <div className="department-summary-card">
          <Users />
          <div>
            <h3>{employees.length}</h3>
            <p>Total Employees</p>
          </div>
        </div>
      </div>

      <div className="department-toolbar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search departments..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="department-grid">
        {filteredDepartments.length > 0 ? (
          filteredDepartments.map((department) => {
            const employeeCount = employees.filter(
              (employee) => employee.department === department.name
            ).length;

            return (
              <div className="department-card" key={department.id}>
                <div className="department-card-top">
                  <div className="department-icon">
                    <Building2 />
                  </div>

                  <div className="department-actions">
                    <button
                      title="Edit department"
                      onClick={() => openEditModal(department)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      title="Delete department"
                      onClick={() => handleDelete(department)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3>{department.name}</h3>
                <p className="department-description">
                  {department.description || "No description available."}
                </p>

                <div className="department-employee-count">
                  <Users size={16} />
                  <span>{employeeCount} Employees</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="department-empty">
            <Building2 size={35} />
            <h3>No departments found</h3>
            <p>Try another search or add a department.</p>
          </div>
        )}
      </div>

      {/* Add and edit department modal */}
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="department-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h2>
              {editingDepartment ? "Edit Department" : "Add Department"}
            </h2>

            <form onSubmit={handleSubmit}>
              <label>Department Name *</label>
              <input
                type="text"
                value={name}
                placeholder="Enter department name"
                onChange={(event) => setName(event.target.value)}
              />

              <label>Description</label>
              <textarea
                value={description}
                placeholder="Enter department description"
                onChange={(event) => setDescription(event.target.value)}
                rows="4"
              />

              {error && <p className="department-error">{error}</p>}

              <div className="department-modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingDepartment ? "Update Department" : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Departments;
