import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ user }) { // Accept user as a prop
  const [searchText, setSearchText] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = useNavigate();
  const settingsRef = useRef(null);
  
  // Close settings dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login"); // Redirect to your login page
  };

  // Sidebar menu items
  // Added a 'path' property to each item for routing
  const menuItems = [
    { name: "Home", path: "/dashboard/employee", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/1tiea0ff_expires_30_days.png" },
    { name: "Task", path: "/dashboard/employee/tasks", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/nftk4cn0_expires_30_days.png" },
    { name: "Attendance", path: "/dashboard/employee/attendance", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/8i5hdmtf_expires_30_days.png" },
    { name: "Sales", path: "/dashboard/employee/sales", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/gs83arzr_expires_30_days.png" },
    { name: "Reports", path: "/dashboard/employee/reports", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/61zpjsff_expires_30_days.png" },
    { name: "Contact", path: "/dashboard/employee/contact", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/yig4meo6_expires_30_days.png" },
    { name: "Company", path: "/dashboard/employee/company", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/sf0ehoxm_expires_30_days.png" },
    { name: "Calendar", path: "/dashboard/employee/calendar", icon: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/4l6p6d26_expires_30_days.png" },
  ];
  
  // Internal CSS for hiding the scrollbar
  const internalCss = `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `;

  return (
    <>
      <style>{internalCss}</style>
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* ---- SIDEBAR ---- */}
      {/* The sidebar is fixed and has its own scrollbar if content overflows */}
      <aside className="flex-shrink-0 w-[260px] bg-[#5E33AC] shadow-xl">
        {/* Added 'scrollbar-hide' class to conceal the scrollbar visually */}
        <div className="flex h-full flex-col overflow-y-auto p-6 scrollbar-hide">
          {/* Profile Section */}
          <div className="mb-10 flex flex-col items-center text-center">
            {/* --- PROFILE IMAGE --- */}
            {/* It uses the avatar from localStorage, or a default image if not found. */}
            <img
              src={user?.avatar || "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/wgo6e9kp_expires_30_days.png"}
              alt="Profile"
              className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
            />
            {/* --- EMPLOYEE NAME --- */}
            {/* It uses the name from localStorage, or a default name if not found. */}
            <h2 className="mt-3 text-lg font-semibold text-white">
              {user?.name ? user.name : "Employee Name"}
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              // The 'end' prop ensures the Home link isn't active for all child routes
              end={item.path === "/dashboard/employee"}
              // Use a function in className to receive the `isActive` state
              className={({ isActive }) =>
                `flex items-center cursor-pointer transition-all duration-200 rounded-2xl ${
                  isActive ? "bg-white/20 px-5 py-3" : "px-3 py-2 hover:bg-white/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                <img src={item.icon} alt={item.name} className="w-[28px] h-[28px] mr-4" />
                <span
                  className={`text-lg font-semibold ${
                    isActive ? "text-white" : "text-gray-200"
                  }`}
                >
                  {item.name}
                </span>
                </>
              )}
            </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* ---- MAIN CONTENT AREA ---- */}
      <div className="flex flex-1 flex-col">
        {/* Header: Search + Profile */}
        <header className="flex flex-shrink-0 items-center justify-between border-b bg-white p-4 px-6">
          {/* Left side: Search Box */}
          <div className="relative w-[450px]">
            <input
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2.5 pl-12 pr-5 text-gray-700 outline-none focus:border-blue-500 focus:bg-white"
            />

            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
                alt="search"
                className="w-5 opacity-50"
              />
            </div>
          </div>

          {/* Right side: Actions & Profile */}
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 transition hover:text-gray-800">
              <BellIcon className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
            </button>

            {/* Settings Dropdown */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="text-gray-500 transition hover:text-gray-800"
              >
                <Cog6ToothIcon className="h-6 w-6" />
              </button>

              {/* Dropdown Menu */}
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <NavLink
                    to="/dashboard/employee/profile" // Assuming this is your profile route
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsSettingsOpen(false)}
                  >
                    <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400" />
                    My Account
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ---- SCROLLABLE CONTENT ---- */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
}
