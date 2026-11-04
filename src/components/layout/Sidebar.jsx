
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Settings,
  UsersRound,
  BriefcaseBusiness
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Employees", path: "/employees", icon: Users },
  { name: "Departments", path: "/departments", icon: Building2 },
  { name: "Leave Requests", path: "/leaves", icon: CalendarDays },
  { name: "Attendance", path: "/attendance", icon: ClipboardCheck },
  { name: "Settings", path: "/settings", icon: Settings }
];

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* Application logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BriefcaseBusiness size={23} />
        </div>

        {!collapsed && (
          <h2>EMS System</h2>
        )}
      </div>

      {/* Navigation menu */}
      <div className="sidebar-menu">
        {!collapsed && <p className="menu-label">MAIN MENU</p>}

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.name : ""}
            >
              <Icon size={20} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* Sidebar bottom section */}
      <div className="sidebar-bottom">
        <UsersRound size={20} />
        {!collapsed && <span>Employee Portal</span>}
      </div>

      {/* Collapse button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        title="Toggle sidebar"
      >
        {collapsed ? "→" : "←"}
      </button>

    </aside>
  );
}

export default Sidebar;
