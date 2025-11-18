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
  Menu,
  User,
} from "lucide-react";
import { clearAuth, getAuth } from "../../lib/auth";

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const nav = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    clearAuth();
    window.dispatchEvent(new Event("auth:update"));
    setTimeout(() => {
      window.location.href = "/";
      window.location.reload();
    }, 100);
  };

  const handleMyAccount = () => {
    setMenuOpen(false);
    nav("/dashboard/user/profile");
  };

  useEffect(() => {
    // Fetch user data on component mount
    const authData = getAuth();
    if (authData?.user) {
      setUser(authData.user);
    }

    // Try to fetch current user's profile image via authenticated endpoint
    (async () => {
      try {
        const resp = await (await import("../../lib/api")).userAPI.profileImage();
        const blob = resp.data;
        const url = URL.createObjectURL(blob);
        setUser((u) => ({ ...(u || {}), profileBlobUrl: url }));
      } catch (e) {
        // ignore
      }
    })();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sidebar items
  const navItems = [
    { to: "/dashboard/user/home", label: "Home", icon: <Home size={22} /> },
    { to: "/dashboard/user/compliances", label: "Compliances", icon: <ShieldCheck size={22} /> },
    { to: "/dashboard/user/documents", label: "Documents", icon: <FolderOpen size={22} /> },
    { to: "/dashboard/user/servicehub", label: "Service Hub", icon: <Monitor size={22} /> },
    { to: "/dashboard/user/calendar", label: "Calendar", icon: <Calendar size={22} /> },
    { to: "/dashboard/user/reports", label: "Reports", icon: <BarChart2 size={22} /> },
    { to: "/dashboard/user/consult", label: "Consult", icon: <Headphones size={22} /> },
    { to: "/dashboard/user/users", label: "Users & Roles", icon: <Users size={22} /> },
  ];

  // Update active indicator position based on route
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => location.pathname.startsWith(item.to));
    if (activeIndex !== -1) {
      // Each item is spaced ~60px vertically
      setIndicatorTop(150 + activeIndex * 60);
    }
  }, [location.pathname]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* ===== Sidebar ===== */}
      <aside
        style={{
          width: "260px",
          height: "100%",
          background: "#1F4B8F",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "40px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          position: "relative",
        }}
      >
        {/* White vertical bar that moves with active link */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: `${indicatorTop}px`,
            background: "white",
            width: "10px",
            height: "50px",
            borderTopRightRadius: "18px",
            borderBottomRightRadius: "24px",
            transition: "top 0.3s ease-in-out",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            marginBottom: "60px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Menu style={{ width: "38px", height: "38px", color: "white" }} />
        </div>

        {/* Sidebar nav */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "38px",
            width: "100%",
            marginTop: "30px",
            marginLeft: "10px",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "14px",
                color: isActive ? "white" : "rgba(255,255,255,0.7)",
                transform: isActive ? "scale(1.05)" : "scale(1)",
                fontWeight: 600,
                fontSize: "18px",
                textDecoration: "none",
                transition: "all 0.2s",
              })}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </div>
              <span style={{ textTransform: "capitalize" }}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ===== Main Section ===== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          padding: "30px 32px 24px 32px",
          overflowY: "auto",
        }}
      >
        {/* ===== Header ===== */}
        <header
          ref={menuRef}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: "44px",
                height: "44px",
                background: "white",
                color: "#1F4B8F",
                borderRadius: "50%",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            > 
              {user?.profileBlobUrl ? (
                <img
                  src={user.profileBlobUrl}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <User size={22} />
              )}
            </button>

            {menuOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: "12px",
                  width: "176px",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  padding: "8px 0",
                  zIndex: 20,
                  color: "#1F4B8F",
                }}
              >
                <button
                  onClick={handleMyAccount}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  My Account
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#fee2e2")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ===== Page Content ===== */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
