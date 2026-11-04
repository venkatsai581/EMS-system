
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, IndianRupee, User } from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { employees } = useEmployees();

  // Find the selected employee using the URL ID
  const employee = employees.find(
    (item) => String(item.id) === id
  );

  // Show a message if the employee does not exist
  if (!employee) {
    return (
      <div className="profile-not-found">
        <h2>Employee Not Found</h2>
        <p>The employee record may have been deleted.</p>
        <button onClick={() => navigate("/employees")}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <button
        className="back-button"
        onClick={() => navigate("/employees")}
      >
        <ArrowLeft size={18} />
        Back to Employees
      </button>

      <div className="profile-header">
        <div className="profile-avatar">
          {employee.firstName?.charAt(0)}
          {employee.lastName?.charAt(0)}
        </div>

        <div className="profile-heading">
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
          <p>{employee.designation}</p>
          <span className={`status-badge ${employee.status.toLowerCase()}`}>
            {employee.status}
          </span>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card">
          <h2>Personal Information</h2>

          <div className="profile-detail">
            <User />
            <div>
              <small>Gender</small>
              <p>{employee.gender}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Mail />
            <div>
              <small>Email Address</small>
              <p>{employee.email}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Phone />
            <div>
              <small>Phone Number</small>
              <p>{employee.phone}</p>
            </div>
          </div>

          <div className="profile-detail">
            <MapPin />
            <div>
              <small>Address</small>
              <p>{employee.address}</p>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <h2>Employment Information</h2>

          <div className="profile-detail">
            <Briefcase />
            <div>
              <small>Department</small>
              <p>{employee.department}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Briefcase />
            <div>
              <small>Employment Type</small>
              <p>{employee.employmentType}</p>
            </div>
          </div>

          <div className="profile-detail">
            <Calendar />
            <div>
              <small>Joining Date</small>
              <p>{employee.joiningDate}</p>
            </div>
          </div>

          <div className="profile-detail">
            <IndianRupee />
            <div>
              <small>Salary</small>
              <p>₹{Number(employee.salary).toLocaleString("en-IN")}</p>
            </div>
          </div>
        </section>
      </div>

      <button
        className="edit-profile-button"
        onClick={() => navigate("/employees", {
          state: { editEmployeeId: employee.id }
        })}
      >
        Edit Employee
      </button>
    </div>
  );
}

export default EmployeeProfile;
