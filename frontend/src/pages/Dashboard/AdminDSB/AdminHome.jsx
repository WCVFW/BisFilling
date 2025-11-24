import React, { useState, useEffect } from "react";
import { getAuth } from "../../../lib/auth";
import { adminAPI } from "../../../lib/api";
import { Users, ShoppingCart, BarChart, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon, color, loading }) => (
  <div className="p-6 bg-white border rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {loading ? <div className="w-24 h-8 mt-1 bg-gray-200 rounded animate-pulse"></div> : <p className="text-3xl font-bold text-gray-800">{value}</p>}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminHome() {
  const authData = getAuth();
  const user = authData?.user;
  const adminName = user?.fullName || user?.email || "Admin";

  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    newOrders: 0,
    salesRevenue: 0,
    performance: "0%",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await adminAPI.getDashboardStats();
        setDashboardStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    { title: "Total Customers", value: dashboardStats.totalCustomers.toLocaleString(), icon: <Users className="w-6 h-6 text-white" />, color: "bg-blue-500" },
    { title: "New Orders", value: dashboardStats.newOrders, icon: <ShoppingCart className="w-6 h-6 text-white" />, color: "bg-green-500" },
    { title: "Sales Revenue", value: `₹${dashboardStats.salesRevenue.toLocaleString()}`, icon: <BarChart className="w-6 h-6 text-white" />, color: "bg-yellow-500" },
    { title: "Performance", value: dashboardStats.performance, icon: <TrendingUp className="w-6 h-6 text-white" />, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {adminName}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here's a snapshot of your business activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            loading={loading}
          />
        ))}
      </div>

      {/* Placeholder for more components like recent orders or charts */}
    </div>
  );
}