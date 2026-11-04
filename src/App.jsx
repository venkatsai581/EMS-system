
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Departments from "./pages/Departments";
import Leaves from "./pages/Leaves";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import { useSettings } from "./context/SettingsContext";

function App() {
  const { theme } = useSettings();

  // Apply selected theme to the entire application
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* Dashboard page */}
        <Route index element={<Dashboard />} />

        {/* Employee directory */}
        <Route path="employees" element={<Employees />} />

        {/* Employee profile */}
        <Route path="employees/:id" element={<EmployeeProfile />} />

        {/* Department management */}
        <Route path="departments" element={<Departments />} />

        {/* Leave management */}
        <Route path="leaves" element={<Leaves />} />

        {/* Attendance management */}
        <Route path="attendance" element={<Attendance />} />

        {/* Application settings */}
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
