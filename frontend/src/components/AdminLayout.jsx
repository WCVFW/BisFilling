import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  Star,
  ClipboardList,
  BarChart2,
  ShoppingCart,
  FileText,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import { getUser } from "../lib/auth";

const AdminLayout = ({ children, logout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { path: "/dashboard/admin/customers", label: "Customers", icon: Users },
    { path: "/dashboard/admin/employees", label: "Employees", icon: Briefcase },
    { path: "/dashboard/admin/attendance", label: "Attendance", icon: Calendar },
    { path: "/dashboard/admin/performance", label: "Performance", icon: Star },
    { path: "/dashboard/admin/lead-report", label: "Lead Report", icon: ClipboardList },
    { path: "/dashboard/admin/deal-report", label: "Deal Report", icon: Briefcase },
    { path: "/dashboard/admin/employee-attendance-report", label: "Att. Report", icon: Calendar },
    { path: "/dashboard/admin/sales-reports", label: "Sales Reports", icon: BarChart2 },
    { path: "/dashboard/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/dashboard/admin/reports", label: "Reports", icon: FileText },
    { path: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (itemPath, end = false) => {
    if (end) return location.pathname === itemPath;
    return location.pathname.startsWith(itemPath);
  };

  const NavIcon = ({ icon: IconComponent, className = "w-4 h-4" }) =>
    IconComponent ? <IconComponent className={className} /> : null;

  return (
    // CHANGE: Removed w-screen. h-screen and flex manage full viewport.
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950"> 
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 border-b border-gray-100 h-14 dark:border-gray-800">
          <Link
            to="/dashboard/admin"
            className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white"
          >
            <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-blue-600 rounded-md">
              A
            </div>
            <span className="hidden sm:inline">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-700 rounded lg:hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        {/* NOTE: scrollbar-thin utilities require installing the tailwindcss-scrollbar plugin */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                isActive(item.path, item.end)
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <NavIcon icon={item.icon} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 space-y-1 border-t border-gray-100 dark:border-gray-800">
          <Link
            to="/dashboard/admin/profile"
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 transition-colors rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <button
            onClick={() => {
              logout();
              setSidebarOpen(false);
            }}
            className="flex items-center w-full gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-md dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      {/* CHANGE: Added w-full to ensure it fills the remaining space */}
      <div className="flex flex-col flex-1 w-full h-full overflow-hidden"> 
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-between w-full px-4 bg-white border-b border-gray-100 h-14 dark:bg-gray-900 dark:border-gray-800">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 text-gray-700 rounded-md lg:hidden dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <h2 className="flex-1 ml-3 text-base font-semibold text-gray-900 dark:text-white lg:ml-0">
            {navItems.find((item) => isActive(item.path, item.end))?.label || "Dashboard"}
          </h2>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded-full">
                <User className="w-4 h-4" />
              </div>
              {/* <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" /> */}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 z-50 w-40 mt-2 bg-white border border-gray-100 rounded-md shadow-md dark:bg-gray-900 dark:border-gray-700">
                <button
                  onClick={() => {
                    navigate("/dashboard/admin/profile");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-colors rounded-t-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <User className="w-4 h-4" />
                  My Account
                </button>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full gap-2 px-3 py-2 text-sm font-medium text-red-600 transition-colors rounded-b-md hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        {/* NOTE: scrollbar-thin utilities require installing the tailwindcss-scrollbar plugin */}
        <div className="flex-1 w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          <div className="min-h-full p-4 lg:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;