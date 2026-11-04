
import { useState } from "react";
import { useEmployees } from "../../context/EmployeeContext";

// Default empty employee form
const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  department: "",
  designation: "",
  employmentType: "Full Time",
  status: "Active",
  joiningDate: "",
  salary: "",
  address: ""
};

function EmployeeForm({ employee, onSubmit, onCancel }) {

  // Load existing employee data when editing
  const [formData, setFormData] = useState(
    employee
      ? { ...emptyForm, ...employee, salary: String(employee.salary) }
      : emptyForm
  );

  const [errors, setErrors] = useState({});

  const { departments } = useEmployees();

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    // Clear field error when user corrects input
    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));
  };

  // Validate all required fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.department) {
      newErrors.department = "Please select department";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    } else if (
      formData.joiningDate > new Date().toISOString().slice(0, 10)
    ) {
      newErrors.joiningDate = "Joining date cannot be in the future";
    }

    if (
      formData.salary === "" ||
      !Number.isFinite(Number(formData.salary)) ||
      Number(formData.salary) <= 0
    ) {
      newErrors.salary = "Enter a valid salary";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit validated employee details
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      designation: formData.designation.trim(),
      address: formData.address.trim(),
      salary: Number(formData.salary)
    });
  };

  // Reusable input field
  const renderInput = (label, name, type = "text") => (
    <div className="form-group">
      <label htmlFor={name}>{label} *</label>

      <input
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />

      {errors[name] && (
        <span className="error-message">{errors[name]}</span>
      )}
    </div>
  );

  return (
    <form className="employee-form" onSubmit={handleSubmit}>

      <div className="form-section-title">
        <h3>Personal Information</h3>
        <p>Enter the employee's basic details.</p>
      </div>

      <div className="form-grid">

        {renderInput("First Name", "firstName")}
        {renderInput("Last Name", "lastName")}
        {renderInput("Email Address", "email", "email")}
        {renderInput("Phone Number", "phone", "tel")}

        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>

        {renderInput("Address", "address")}

      </div>

      <div className="form-section-title">
        <h3>Professional Information</h3>
        <p>Enter employment and department details.</p>
      </div>

      <div className="form-grid">

        <div className="form-group">
          <label>Department *</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select department</option>

            {departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>

          {errors.department && (
            <span className="error-message">{errors.department}</span>
          )}
        </div>

        {renderInput("Designation", "designation")}

        <div className="form-group">
          <label>Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
        </div>

        <div className="form-group">
          <label>Employment Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {renderInput("Joining Date", "joiningDate", "date")}
        {renderInput("Monthly Salary (₹)", "salary", "number")}

      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit" className="primary-btn">
          {employee ? "Update Employee" : "Add Employee"}
        </button>
      </div>

    </form>
  );
}

export default EmployeeForm;
