import React, { useState, useEffect } from "react";
import { getUser } from "../../lib/auth";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import ListCard from "../../components/ListCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// NOTE: To properly use "Roboto" font, you must configure your Tailwind
// theme in tailwind.config.js to set 'font-sans' to include Roboto.
const FONT_CLASS = "font-sans";

// --- Mock Data ---
// In a real app, this data would come from your API
const mockApiData = {
  kpiStats: {
    totalRevenue: "$524K",
    revenueChange: 12,
    totalCustomers: "1,250",
    customersChange: 8.5,
    totalOrders: "580",
    ordersChange: 15.2,
    growthRate: "24.5%",
    growthChange: 3.2,
  },
  revenueData: [
    { month: "Jan", revenue: 45000, target: 50000 },
    { month: "Feb", revenue: 52000, target: 50000 },
    { month: "Mar", revenue: 48000, target: 50000 },
    { month: "Apr", revenue: 61000, target: 50000 },
    { month: "May", revenue: 55000, target: 50000 },
    { month: "Jun", revenue: 67000, target: 50000 },
  ],
  leadsData: [
    { month: "Jan", total: 120, qualified: 45, converted: 12 },
    { month: "Feb", total: 135, qualified: 52, converted: 18 },
    { month: "Mar", total: 110, qualified: 48, converted: 15 },
    { month: "Apr", total: 145, qualified: 58, converted: 22 },
    { month: "May", total: 160, qualified: 65, converted: 28 },
    { month: "Jun", total: 180, qualified: 75, converted: 35 },
  ],
  sourceData: [
    { name: "Website", value: 45 },
    { name: "Referral", value: 25 },
    { name: "Direct", value: 20 },
    { name: "Social", value: 10 },
  ],
  topProducts: [
    { name: "Premium Plan", revenue: 125000, units: 250, growth: 12.5 },
    { name: "Enterprise Suite", revenue: 98000, units: 45, growth: 8.2 },
    { name: "Starter Bundle", revenue: 45000, units: 180, growth: 5.3 },
    { name: "Consulting Services", revenue: 62000, units: 15, growth: 18.7 },
  ],
  topCustomers: [
    { name: "Acme Corporation", email: "contact@acme.com", revenue: 85000, status: "Active" },
    { name: "Tech Innovations Inc", email: "hello@techinno.com", revenue: 72000, status: "Active" },
    { name: "Global Solutions Ltd", email: "info@globalsol.com", revenue: 58000, status: "Active" },
    { name: "Future Systems", email: "contact@futuresys.com", revenue: 45000, status: "Inactive" },
  ],
  recentActivities: [
    { id: 1, type: "Customer Created", user: "Alice Johnson", time: "2 hours ago", value: null },
    { id: 2, type: "Order Placed", user: "Bob Smith", time: "4 hours ago", value: "$45,000" },
    { id: 3, type: "Employee Added", user: "Carol Davis", time: "1 day ago", value: null },
    { id: 4, type: "Payment Received", user: "David Wilson", time: "2 days ago", value: "$25,000" },
    { id: 5, type: "Ticket Resolved", user: "Emma Brown", time: "3 days ago", value: null },
  ],
  systemStatus: [
    { service: "Database", status: "Operational", uptime: "99.98%" },
    { service: "API Server", status: "Operational", uptime: "99.95%" },
    { service: "Email Service", status: "Operational", uptime: "99.92%" },
    { service: "Payment Gateway", status: "Operational", uptime: "99.99%" },
  ],
};
// --- End Mock Data ---


const AdminHome = () => {
  const user = getUser();
  const name = user?.fullName || user?.name || user?.email || "Admin";

  // State for data, loading, and errors
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- REPLACE THIS WITH YOUR REAL API CALL ---
        // Example:
        // const response = await fetch("/api/admin/dashboard");
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        // const data = await response.json();
        
        // Simulating a 1-second network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Using mock data for this example
        const data = mockApiData; 
        // --- END OF MOCK/REAL API CALL ---

        setDashboardData(data);

      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Using Lucide icons to replace emojis for consistency/compactness
  const getIconForActivity = (type) => {
    switch (type) {
      case "Customer Created":
      case "Employee Added":
        return <Users className="w-4 h-4 text-gray-500" />;
      case "Order Placed":
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case "Payment Received":
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case "Ticket Resolved":
        return <CheckCircle className="w-4 h-4 text-teal-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const COLORS = ["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

  // Loading State
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-[60vh] ${FONT_CLASS}`}>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`flex items-center justify-center h-[60vh] ${FONT_CLASS}`}>
        <div className="p-6 text-center bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-300">
            Failed to load data
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }
  
  // Data-dependent check
  if (!dashboardData) {
    return null; // Should be covered by loading/error, but good for safety
  }

  // Render dashboard
  return (
    // Applied FONT_CLASS for the desired font stack
    <div className={`space-y-5 ${FONT_CLASS}`}>
      {/* Welcome Section */}
      {/* <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Welcome, {name}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Performance overview
          </p>
        </div>
      </div> */}

      {/* KPI Cards (Reading from dashboardData.kpiStats) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={dashboardData.kpiStats.totalRevenue}
          icon={<DollarSign className="w-4 h-4" />} // Further reduced icon size
          change={dashboardData.kpiStats.revenueChange}
          description="This month"
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Customers"
          value={dashboardData.kpiStats.totalCustomers}
          icon={<Users className="w-4 h-4" />}
          change={dashboardData.kpiStats.customersChange}
          description="Active customers"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.kpiStats.totalOrders}
          icon={<ShoppingCart className="w-4 h-4" />}
          change={dashboardData.kpiStats.ordersChange}
          description="This month"
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Growth Rate"
          value={dashboardData.kpiStats.growthRate}
          icon={<TrendingUp className="w-4 h-4" />}
          change={dashboardData.kpiStats.growthChange}
          description="Year-over-year"
          bgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      {/* Charts Section (Reduced gap and size) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart (Reading from dashboardData.revenueData) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue Overview"
            subtitle="Monthly revenue vs target"
          >
            <ResponsiveContainer width="100%" height={260}> {/* Further reduced height */}
              <BarChart data={dashboardData.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "10px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                    fontSize: "11px", // Reduced tooltip font size
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Source Distribution (Reading from dashboardData.sourceData) */}
        <ChartCard title="Lead Sources" subtitle="Distribution">
          <ResponsiveContainer width="100%" height={260}> {/* Further reduced height */}
            <PieChart>
              <Pie
                data={dashboardData.sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={75} // Reduced radius
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: "11px" }} // Reduced pie label font size
              >
                {dashboardData.sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "4px" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Leads Trend (Reading from dashboardData.leadsData) */}
      <ChartCard title="Leads Trend" subtitle="Monthly leads overview">
        <ResponsiveContainer width="100%" height={260}> {/* Further reduced height */}
          <LineChart data={dashboardData.leadsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              style={{ fontSize: "10px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                fontSize: "11px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3B82F6"
              strokeWidth={1.5}
              dot={{ fill: "#3B82F6", r: 2.5 }} // Reduced dot size
            />
            <Line
              type="monotone"
              dataKey="qualified"
              stroke="#8B5CF6"
              strokeWidth={1.5}
              dot={{ fill: "#8B5CF6", r: 2.5 }}
            />
            <Line
              type="monotone"
              dataKey="converted"
              stroke="#10B981"
              strokeWidth={1.5}
              dot={{ fill: "#10B981", r: 2.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Lists Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top Products (Reading from dashboardData.topProducts) */}
        <ListCard
          title="Top Products"
          items={dashboardData.topProducts}
          renderItem={(product) => (
            <div className="space-y-0.5"> {/* Reduced space-y */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {product.units} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">
                    ↑ {product.growth}%
                  </p>
                </div>
              </div>
            </div>
          )}
        />

        {/* Top Customers (Reading from dashboardData.topCustomers) */}
        <ListCard
          title="Top Customers"
          items={dashboardData.topCustomers}
          renderItem={(customer) => (
            <div className="space-y-0.5"> {/* Reduced space-y */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {customer.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {customer.email}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-0.5">
                    Revenue: ${customer.revenue.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${ // Reduced font size here
                    customer.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          )}
        />
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Activities (Reading from dashboardData.recentActivities) */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800"> {/* Reduced padding */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {dashboardData.recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50" // Reduced padding
                >
                  <div className="flex items-center gap-3">
                    {/* Using Lucide icons now */}
                    <div className="flex-shrink-0">{getIconForActivity(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.type}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            by {activity.user}
                          </p>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-500 whitespace-nowrap">
                          {activity.time}
                        </p>
                      </div>
                      {activity.value && (
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-0.5">
                          {activity.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status (Reading from dashboardData.systemStatus) */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
            System Status
          </h3>
          <div className="space-y-3">
            {dashboardData.systemStatus.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.service}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.status} • {item.uptime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;