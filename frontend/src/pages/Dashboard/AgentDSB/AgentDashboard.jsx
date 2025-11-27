import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Wallet,
    FileText,
    User,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { clearAuth } from "../../../lib/auth";

const AgentDashboard = ({ user }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: "/dashboard/agent", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/dashboard/agent/wallet", label: "My Wallet", icon: <Wallet size={20} /> },
        { path: "/dashboard/agent/orders", label: "My Orders", icon: <FileText size={20} /> },
        { path: "/dashboard/agent/profile", label: "Profile", icon: <User size={20} /> },
    ];

    const handleLogout = () => {
        clearAuth();
        window.dispatchEvent(new Event("auth:update"));
        navigate("/");
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Agent Panel</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user?.fullName?.charAt(0) || "A"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.fullName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 lg:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500">
                        <Menu size={24} />
                    </button>
                    <span className="font-semibold text-gray-900 dark:text-white">Dashboard</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AgentDashboard;
