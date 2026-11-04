
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  User, Bell, Palette, Save, ShieldCheck
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";

function Settings() {
  const location = useLocation();

  // Scroll directly to the administrator profile when selected from the header menu.
  useEffect(() => {
    if (location.hash === "#profile") {
      document.getElementById("profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const {
    adminProfile,
    setAdminProfile,
    theme,
    setTheme,
    notifications,
    setNotifications
  } = useSettings();

  const [profile, setProfile] = useState({ ...adminProfile });
  const [message, setMessage] = useState("");

  // Update profile input values
  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value
    }));

    setMessage("");
  };

  // Save administrator profile
  const handleProfileSubmit = (event) => {
    event.preventDefault();

    if (!profile.name.trim()) {
      setMessage("Administrator name is required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(profile.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(profile.phone)) {
      setMessage("Phone number must contain exactly 10 digits.");
      return;
    }

    setAdminProfile({
      ...profile,
      name: profile.name.trim()
    });

    setMessage("Profile updated successfully!");
  };

  // Update notification preference
  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;

    setNotifications((previous) => ({
      ...previous,
      [name]: checked
    }));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your administrator profile and application preferences.</p>
      </div>

      {/* Administrator profile */}
      <section className="settings-card" id="profile">
        <div className="settings-card-heading">
          <User />
          <div>
            <h2>Administrator Profile</h2>
            <p>Update your personal information.</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="settings-form-grid">
            <div className="settings-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter administrator name"
              />
            </div>

            <div className="settings-field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Enter email address"
              />
            </div>

            <div className="settings-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                maxLength="10"
                onChange={handleProfileChange}
                placeholder="Enter 10-digit phone number"
              />
            </div>

            <div className="settings-field">
              <label>Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
              />
            </div>
          </div>

          {message && (
            <p className="settings-message">{message}</p>
          )}

          <button type="submit" className="settings-save-btn">
            <Save size={17} />
            Save Profile
          </button>
        </form>
      </section>

      {/* Theme preferences */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <Palette />
          <div>
            <h2>Appearance</h2>
            <p>Choose your preferred application theme.</p>
          </div>
        </div>

        <div className="theme-options">
          <button
            type="button"
            className={`theme-option ${theme === "light" ? "selected" : ""}`}
            onClick={() => setTheme("light")}
          >
            <span className="theme-preview light-preview" />
            <span>Light Mode</span>
          </button>

          <button
            type="button"
            className={`theme-option ${theme === "dark" ? "selected" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <span className="theme-preview dark-preview" />
            <span>Dark Mode</span>
          </button>
        </div>
      </section>

      {/* Notification preferences */}
      <section className="settings-card">
        <div className="settings-card-heading">
          <Bell />
          <div>
            <h2>Notifications</h2>
            <p>Manage application notification preferences.</p>
          </div>
        </div>

        <div className="notification-options">
          <label>
            <div>
              <strong>Email Notifications</strong>
              <p>Receive general email notifications.</p>
            </div>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />
          </label>

          <label>
            <div>
              <strong>Leave Notifications</strong>
              <p>Receive updates about employee leave requests.</p>
            </div>
            <input
              type="checkbox"
              name="leaveNotifications"
              checked={notifications.leaveNotifications}
              onChange={handleNotificationChange}
            />
          </label>

          <label>
            <div>
              <strong>Attendance Notifications</strong>
              <p>Receive employee attendance updates.</p>
            </div>
            <input
              type="checkbox"
              name="attendanceNotifications"
              checked={notifications.attendanceNotifications}
              onChange={handleNotificationChange}
            />
          </label>
        </div>
      </section>

      {/* Security information */}
      <section className="settings-security">
        <ShieldCheck size={23} />
        <div>
          <h3>Account Security</h3>
          <p>
            Your settings are stored locally in this browser.
            This demo does not provide server-side authentication.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Settings;
