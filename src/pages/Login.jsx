import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Users, ArrowRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminProfile } = useSettings();
  const loggedOut = Boolean(location.state?.loggedOut);

  const handleDemoLogin = () => {
    sessionStorage.removeItem("ems_demo_logged_out");
    navigate("/", { replace: true });
  };

  return (
    <main className="ems-login-page">
      <section className="ems-login-card">
        <div className="ems-login-logo"><Users size={27} /></div>
        <span className="ems-login-eyebrow">EMPLOYEE MANAGEMENT SYSTEM</span>
        <h1>{loggedOut ? "You are logged out" : "Administrator sign in"}</h1>
        <p>{loggedOut
          ? "Your demo administrator session has ended. Your saved employee data and preferences are safe in this browser."
          : "Continue to the employee management dashboard using the demo administrator account."}</p>
        <div className="ems-login-account">
          <span className="ems-login-account-icon"><ShieldCheck size={20} /></span>
          <div><strong>{adminProfile.name}</strong><small>{adminProfile.email}</small></div>
          <span className="ems-demo-tag">DEMO</span>
        </div>
        <button type="button" className="ems-login-button" onClick={handleDemoLogin}>
          Sign in as Administrator <ArrowRight size={18} />
        </button>
        <small className="ems-login-note">Demo mode · No password or server authentication is configured.</small>
      </section>
    </main>
  );
}

export default Login;
