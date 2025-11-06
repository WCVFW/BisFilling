import React, { useState } from "react";

const AdminPerformance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Mock employee performance data
  const employees = [
    {
      id: 1,
      name: "Alice Johnson",
      department: "Sales",
      role: "Senior Sales Manager",
      quota: 250000,
      achieved: 245000,
      rating: 4.8,
      deals: 12,
      avgDealSize: 20417,
      conversionRate: 68,
      customerSatisfaction: 92,
      onTimeDelivery: 98,
      qualityScore: 95,
      attendancePercentage: 98,
    },
    {
      id: 2,
      name: "Bob Smith",
      department: "Sales",
      role: "Sales Executive",
      quota: 220000,
      achieved: 198000,
      rating: 4.5,
      deals: 9,
      avgDealSize: 22000,
      conversionRate: 62,
      customerSatisfaction: 88,
      onTimeDelivery: 95,
      qualityScore: 92,
      attendancePercentage: 96,
    },
    {
      id: 3,
      name: "Carol Davis",
      department: "Sales",
      role: "Sales Executive",
      quota: 200000,
      achieved: 165000,
      rating: 4.2,
      deals: 7,
      avgDealSize: 23571,
      conversionRate: 58,
      customerSatisfaction: 85,
      onTimeDelivery: 92,
      qualityScore: 89,
      attendancePercentage: 94,
    },
    {
      id: 4,
      name: "David Wilson",
      department: "Customer Success",
      role: "Account Manager",
      quota: 150000,
      achieved: 142000,
      rating: 4.6,
      deals: 8,
      avgDealSize: 17750,
      conversionRate: 72,
      customerSatisfaction: 94,
      onTimeDelivery: 99,
      qualityScore: 96,
      attendancePercentage: 99,
    },
    {
      id: 5,
      name: "Emma Brown",
      department: "Operations",
      role: "CRM Coordinator",
      quota: 0,
      achieved: 0,
      rating: 4.7,
      deals: 0,
      avgDealSize: 0,
      conversionRate: 0,
      customerSatisfaction: 91,
      onTimeDelivery: 97,
      qualityScore: 94,
      attendancePercentage: 97,
    },
  ];

  const departments = ["All", ...new Set(employees.map((e) => e.department))];

  // Filter employees
  const filteredEmployees =
    selectedDepartment === "All"
      ? employees
      : employees.filter((e) => e.department === selectedDepartment);

  // Performance Category Card
  const PerformanceCategoryCard = ({ title, value, target, icon, color }) => {
    const percentage = target > 0 ? Math.round((value / target) * 100) : 0;
    const isPositive = value >= target;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <span className="text-2xl">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${color}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <span className={`text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {percentage}%
          </span>
        </div>
        {target > 0 && <p className="text-xs text-gray-500 mt-1">Target: {target.toLocaleString()}</p>}
      </div>
    );
  };

  // Employee Performance Card
  const EmployeePerformanceCard = ({ employee }) => {
    const salesTarget = employee.quota > 0 ? Math.round((employee.achieved / employee.quota) * 100) : 0;
    const overallScore = Math.round(
      (employee.customerSatisfaction * 0.25 +
        employee.onTimeDelivery * 0.25 +
        employee.qualityScore * 0.25 +
        employee.rating * 20 * 0.25) /
        100 * 5
    );

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-600">{employee.role}</p>
            <p className="text-xs text-gray-500 mt-1">{employee.department}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{overallScore.toFixed(1)}</div>
            <div className="text-xs text-gray-500">Overall Score</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {employee.quota > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="text-xs text-gray-600 font-medium">Sales Target</div>
              <div className="text-xl font-bold text-blue-700 mt-1">{salesTarget}%</div>
              <div className="text-xs text-blue-600 mt-1">
                ${(employee.achieved / 1000).toFixed(0)}K / ${(employee.quota / 1000).toFixed(0)}K
              </div>
            </div>
          )}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
            <div className="text-xs text-gray-600 font-medium">Customer Satisfaction</div>
            <div className="text-xl font-bold text-green-700 mt-1">{employee.customerSatisfaction}%</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
            <div className="text-xs text-gray-600 font-medium">On-Time Delivery</div>
            <div className="text-xl font-bold text-purple-700 mt-1">{employee.onTimeDelivery}%</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg">
            <div className="text-xs text-gray-600 font-medium">Quality Score</div>
            <div className="text-xl font-bold text-orange-700 mt-1">{employee.qualityScore}%</div>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Deals Closed</span>
            <span className="font-semibold text-gray-900">{employee.deals}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Avg Deal Size</span>
            <span className="font-semibold text-gray-900">${(employee.avgDealSize / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Conversion Rate</span>
            <span className="font-semibold text-gray-900">{employee.conversionRate}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Attendance</span>
            <span className="font-semibold text-gray-900">{employee.attendancePercentage}%</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            View Details
          </button>
          <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            Schedule Review
          </button>
        </div>
      </div>
    );
  };

  // Department Performance Summary
  const departmentStats = {};
  filteredEmployees.forEach((emp) => {
    if (!departmentStats[emp.department]) {
      departmentStats[emp.department] = {
        count: 0,
        avgRating: 0,
        avgSatisfaction: 0,
        totalDealsClosed: 0,
      };
    }
    departmentStats[emp.department].count += 1;
    departmentStats[emp.department].avgRating += emp.rating;
    departmentStats[emp.department].avgSatisfaction += emp.customerSatisfaction;
    departmentStats[emp.department].totalDealsClosed += emp.deals;
  });

  Object.keys(departmentStats).forEach((dept) => {
    const stats = departmentStats[dept];
    stats.avgRating = (stats.avgRating / stats.count).toFixed(1);
    stats.avgSatisfaction = Math.round(stats.avgSatisfaction / stats.count);
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⭐ Employee Performance Dashboard</h1>
          <p className="mt-1 text-gray-600">Track KPIs, sales targets, and employee ratings</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics Overview */}
      {selectedDepartment === "All" && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics Overview</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <PerformanceCategoryCard
              title="Total Sales"
              value={filteredEmployees.reduce((sum, e) => sum + e.achieved, 0)}
              target={filteredEmployees.reduce((sum, e) => sum + e.quota, 0)}
              icon="💰"
              color="bg-blue-600"
            />
            <PerformanceCategoryCard
              title="Deals Closed"
              value={filteredEmployees.reduce((sum, e) => sum + e.deals, 0)}
              target={filteredEmployees.filter((e) => e.quota > 0).length * 12}
              icon="🎯"
              color="bg-green-600"
            />
            <PerformanceCategoryCard
              title="Avg Satisfaction"
              value={Math.round(
                filteredEmployees.reduce((sum, e) => sum + e.customerSatisfaction, 0) /
                  filteredEmployees.length
              )}
              target={100}
              icon="😊"
              color="bg-purple-600"
            />
            <PerformanceCategoryCard
              title="Avg Rating"
              value={(
                filteredEmployees.reduce((sum, e) => sum + e.rating, 0) /
                filteredEmployees.length
              ).toFixed(1) * 10}
              target={500}
              icon="⭐"
              color="bg-yellow-600"
            />
          </div>
        </div>
      )}

      {/* Department Performance */}
      {selectedDepartment === "All" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(departmentStats).map(([dept, stats]) => (
              <div key={dept} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{dept}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-medium text-gray-900">{stats.count} people</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Rating</span>
                    <span className="font-medium text-yellow-600">{stats.avgRating}★</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Satisfaction</span>
                    <span className="font-medium text-green-600">{stats.avgSatisfaction}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deals Closed</span>
                    <span className="font-medium text-blue-600">{stats.totalDealsClosed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Employee Performance Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedDepartment === "All" ? "All Employees" : `${selectedDepartment} Team`}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <EmployeePerformanceCard key={employee.id} employee={employee} />
          ))}
        </div>
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🏆 Performance Leaderboard</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Rating</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Sales Achievement</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Satisfaction</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Overall Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees
                .map((emp, idx) => ({
                  ...emp,
                  score:
                    emp.customerSatisfaction * 0.25 +
                    emp.onTimeDelivery * 0.25 +
                    emp.qualityScore * 0.25 +
                    emp.rating * 20 * 0.25,
                }))
                .sort((a, b) => b.score - a.score)
                .map((emp, idx) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          idx === 0
                            ? "bg-yellow-100 text-yellow-800"
                            : idx === 1
                            ? "bg-gray-300 text-gray-800"
                            : idx === 2
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : idx + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.role}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold text-yellow-600">{emp.rating}★</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {emp.quota > 0 ? (
                        <span className="font-semibold text-blue-600">
                          {Math.round((emp.achieved / emp.quota) * 100)}%
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-semibold text-green-600">{emp.customerSatisfaction}%</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-bold text-lg text-blue-600">
                        {(emp.score / 100).toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPerformance;
