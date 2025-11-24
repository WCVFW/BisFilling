import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ShieldCheck,
  FolderOpen,
  Monitor,
  Calendar,
  BarChart2,
  Headphones,
  Users,
  Menu as MenuIcon, // Renamed to avoid confusion
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { clearAuth, getAuth } from "../../../lib/auth";
// Import the separate CSS file
import "./UserDashboard.css";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  // indicatorTop state is removed. CSS handles active state now.
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const nav = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuth();
    window.dispatchEvent(new Event("auth:update"));
    // Small delay for smooth transition before reload
    setTimeout(() => {
      window.location.href = "/";
      // window.location.reload(); // Often not needed if redirecting to root
    }, 200);
  };

  const handleMyAccount = () => {
    setMenuOpen(false);
    nav("/dashboard/user/profile");
  };

  useEffect(() => {
    // Fetch user data
    const authData = getAuth();
    if (authData?.user) {
      setUser(authData.user);
    }

    // Fetch profile image
    // Note: It's generally better to have the backend return the image URL 
    // as part of the user object rather than fetching a blob separately, 
    // but keeping your existing logic here for compatibility.
    (async () => {
      try {
        const resp = await (await import("../../../lib/api")).userAPI.profileImage();
        const blob = resp.data;
        // Ensure we actually got a blob before creating URL
        if (blob instanceof Blob) {
          const url = URL.createObjectURL(blob);
          setUser((u) => ({ ...(u || {}), profileBlobUrl: url }));
        }
      } catch (e) {
        // silently fail if no image
      }
    })();

    // Close dropdown on outside click
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Revoke object URL to avoid memory leaks if user image changed
      if (user?.profileBlobUrl) URL.revokeObjectURL(user.profileBlobUrl);
    }
  }, []);

  // Sidebar items configuration
  const navItems = [
    { to: "/dashboard/user/home", label: "Home", icon: <Home size={20} /> },
    { to: "/dashboard/user/compliances", label: "Compliances", icon: <ShieldCheck size={20} /> },
    { to: "/dashboard/user/documents", label: "Documents", icon: <FolderOpen size={20} /> },
    { to: "/dashboard/user/servicehub", label: "Service Hub", icon: <Monitor size={20} /> },
    { to: "/dashboard/user/calendar", label: "Calendar", icon: <Calendar size={20} /> },
    { to: "/dashboard/user/reports", label: "Reports", icon: <BarChart2 size={20} /> },
    { to: "/dashboard/user/consult", label: "Consult", icon: <Headphones size={20} /> },
    // { to: "/dashboard/user/users", label: "Users & Roles", icon: <Users size={20} /> },
  ];

  // Helper to find current active label for the header title
  const getCurrentLabel = () => {
    const currentItem = navItems.find(item => location.pathname.startsWith(item.to));
    return currentItem ? currentItem.label : "Dashboard";
  };

  return (
    <div className="dashboard-container">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        {/* Logo area - Replaced just an icon with a placeholder logo brand */}
        <div className="sidebar-logo">
          <MenuIcon size={28} className="text-blue-400" />
          <span>MyApp Panel</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              // Use className function to apply active class automatically
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ===== Main Wrapper (Header + Content) ===== */}
      <div className="main-wrapper">
        {/* ===== Header ===== */}
        <header className="dashboard-header">
          {/* Dynamic Page Title based on route */}
          <h1 className="header-title">{getCurrentLabel()}</h1>

          <div className="user-menu-container" ref={menuRef}>
            <button
              className="user-avatar-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="User menu"
              aria-expanded={menuOpen}
            >
              {user?.profileBlobUrl ? (
                <img
                  src={user.profileBlobUrl}
                  alt="Profile"
                  className="profile-img"
                />
              ) : (
                <User size={24} />
              )}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="dropdown-menu">
                {/* Added username greeting if available */}
                {user?.firstName && (
                  <div style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#64748b', borderBottom: '1px solid #e2e8f0', marginBottom: '4px' }}>
                    Signed in as <strong>{user.firstName}</strong>
                  </div>
                )}
                <button onClick={handleMyAccount} className="dropdown-item">
                  <Settings size={18} />
                  My Account
                </button>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ===== Page Content Container ===== */}
        <main className="content-container">
          {/* Use a card style for the main content area */}
          <div className="content-card">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}