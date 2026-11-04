
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  // Save administrator profile information
  const [adminProfile, setAdminProfile] = useLocalStorage(
    "ems_admin_profile",
    {
      name: "Administrator",
      email: "admin@company.com",
      phone: "9876543210",
      role: "System Administrator"
    }
  );

  // Save application theme
  const [theme, setTheme] = useLocalStorage("ems_theme", "light");

  // Save notification preferences
  const [notifications, setNotifications] = useLocalStorage(
    "ems_notifications",
    {
      emailNotifications: true,
      leaveNotifications: true,
      attendanceNotifications: false
    }
  );

  return (
    <SettingsContext.Provider
      value={{
        adminProfile,
        setAdminProfile,
        theme,
        setTheme,
        notifications,
        setNotifications
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
