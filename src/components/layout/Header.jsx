
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  UserCircle,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X
} from "lucide-react";
import { useSettings } from "../../context/SettingsContext";

function Header({ onMenuClick }) {
  const { adminProfile } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleOutsideClick(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const openSettings = () => {
    setMenuOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (confirmed) {
      setMenuOpen(false);
      localStorage.removeItem("ems_admin_session");
      navigate("/login");
    }
  };

  return (
    <header className="header">

      <button className="mobile-menu-btn" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="header-search">
        <Search size={19} />
        <input
          type="text"
          placeholder="Search employees, departments..."
        />
      </div>

      <div className="header-right">

        <div className="admin-notification-wrapper">
          <button
            className="notification-btn"
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          {showNotifications && (
            <div className="admin-notification-dropdown">
              <div className="admin-dropdown-heading">
                <strong>Notifications</strong>
                <button onClick={() => setShowNotifications(false)}>
                  <X size={17} />
                </button>
              </div>
              <p>You can manage notification preferences in Settings.</p>
              <button onClick={openSettings}>Manage notifications</button>
            </div>
          )}
        </div>

        <div className="admin-menu-wrapper" ref={menuRef}>
          <button
            className={`admin-profile ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <UserCircle size={36} />

            <div className="admin-profile-info">
              <h4>{adminProfile.name}</h4>
              <span>{adminProfile.role}</span>
            </div>

            <ChevronDown
              size={17}
              className={menuOpen ? "admin-chevron rotated" : "admin-chevron"}
            />
          </button>

          {menuOpen && (
            <div className="admin-dropdown">

              <div className="admin-dropdown-user">
                <UserCircle size={42} />
                <div>
                  <strong>{adminProfile.name}</strong>
                  <span>{adminProfile.email}</span>
                </div>
              </div>

              <div className="admin-dropdown-divider"></div>

              <button onClick={openSettings}>
                <User size={18} />
                <span>My Profile</span>
              </button>

              <button onClick={openSettings}>
                <Settings size={18} />
                <span>Account Settings</span>
              </button>

              <button onClick={() => {
                setMenuOpen(false);
                setShowNotifications(true);
              }}>
                <Bell size={18} />
                <span>Notifications</span>
              </button>

              <button onClick={() => {
                setMenuOpen(false);
                window.alert("Please contact your system administrator for support.");
              }}>
                <HelpCircle size={18} />
                <span>Help & Support</span>
              </button>

              <div className="admin-dropdown-divider"></div>

              <button className="admin-logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;
