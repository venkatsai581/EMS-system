
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-layout">

      {/* Sidebar navigation */}
      <div className={`sidebar-wrapper ${collapsed ? "collapsed-wrapper" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* Main dashboard area */}
      <div className={`main-area ${collapsed ? "expanded" : ""}`}>

        <Header
          onMenuClick={() => setMobileOpen(!mobileOpen)}
        />

        <main className="page-container" onClick={() => setMobileOpen(false)}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;
