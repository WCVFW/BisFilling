import React, { useState } from "react";
import StatCard from "../../../components/StatCard";
import DataTable from "../../../components/DataTable";
import ChartCard from "../../../components/ChartCard";
import { Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminAttendance = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      name: "John Anderson",
      date: "2024-06-14",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      duration: "8h 30m",
      status: "Present",
    },
    {
      id: 2,
      name: "Sarah Chen",
      date: "2024-06-14",
      checkIn: "08:45 AM",
      checkOut: "05:15 PM",
      duration: "8h 30m",
      status: "Present",
    },
    {
      id: 3,
      name: "Michael Roberts",
      date: "2024-06-14",
      checkIn: "—",
      checkOut: "—",
      duration: "0h",
      status: "Absent",
    },
    {
      id: 4,
      name: "Emma Davis",
      date: "2024-06-14",
      checkIn: "09:30 AM",
      checkOut: "—",
      duration: "In Progress",
      status: "Present",
    },
  ]);

  const attendanceTrend = [
    { week: "Week 1", present: 95, absent: 5, late: 3 },
    { week: "Week 2", present: 96, absent: 4, late: 2 },
    { week: "Week 3", present: 94, absent: 6, late: 4 },
    { week: "Week 4", present: 97, absent: 3, late: 1 },
  ];

  const statusData = [
    { name: "Present", value: 118 },
    { name: "Absent", value: 3 },
    { name: "Late", value: 1 },
  ];

  const stats = [
    {
      title: "Present Today",
      value: "118",
      icon: <CheckCircle className="w-6 h-6" />,
      change: 1.2,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Absent",
      value: "3",
      icon: <AlertCircle className="w-6 h-6" />,
      change: -2.1,
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Late Arrivals",
      value: "1",
      icon: <Clock className="w-6 h-6" />,
      change: 0,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Attendance Rate",
      value: "97.5%",
      icon: <Calendar className="w-6 h-6" />,
      change: 0.8,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  const COLORS = ["#10B981", "#EF4444", "#F59E0B"];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Attendance Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track and manage employee attendance
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Attendance Trend"
            subtitle="Weekly attendance overview"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="week"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="late"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={{ fill: "#F59E0B", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Status Distribution */}
        <ChartCard title="Today's Status" subtitle="Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Attendance Records */}
      <DataTable
        title="Today's Attendance"
        columns={[
          { key: "name", label: "Employee Name" },
          { key: "date", label: "Date" },
          { key: "checkIn", label: "Check In" },
          { key: "checkOut", label: "Check Out" },
          { key: "duration", label: "Duration" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  value === "Present"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : value === "Absent"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                }`}
              >
                {value}
              </span>
            ),
          },
        ]}
        data={records}
        searchPlaceholder="Search by employee name..."
      />
    </div>
  );
};

export default AdminAttendance;
