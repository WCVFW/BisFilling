import React, { useState, useEffect } from "react";
import { getUser } from "../../lib/auth";

const AdminHome = () => {
  const user = getUser();
  const name = user?.fullName || user?.name || user?.email || "Admin";
  const [dateRange, setDateRange] = useState("month");

  // Mock data for KPIs and system overview
  const kpiData = {
    employees: { total: 45, active: 42, inactive: 3, trend: "+2 this month", change: 4.4 },
    customers: { total: 1250, active: 980, inactive: 270, trend: "+15 this month", change: 1.2 },
    leads: { total: 580, qualified: 245, converted: 89, trend: "+45 this month", change: 8.4 },
    tickets: { open: 23, pending: 12, resolved: 456, sla_breached: 2, total: 491, change: -2.3 },
    revenue: { total: 2450000, mtd: 524000, ytd: 1890000, trend: "+12% vs last month", change: 12 },
    sales: { 
      pipeline: 890000, 
      deals_in_progress: 28, 
      avg_deal_size: 31785, 
      close_rate: 68,
      change: 5.2 
    },
  };

  const recentActivity = [
    { id: 1, type: "Customer Created", user: "Alice Johnson", time: "2 hours ago", icon: "👤" },
    { id: 2, type: "Deal Closed", user: "Bob Smith", time: "4 hours ago", icon: "💰", value: "$45,000" },
    { id: 3, type: "Employee Added", user: "Carol Davis", time: "1 day ago", icon: "👥" },
    { id: 4, type: "Campaign Launched", user: "David Wilson", time: "2 days ago", icon: "📧" },
    { id: 5, type: "Ticket Resolved", user: "Emma Brown", time: "3 days ago", icon: "✓" },
  ];

  const systemHealth = [
    { service: "Database", status: "Operational", uptime: "99.98%", response: "12ms", icon: "🗄️" },
    { service: "Email Service", status: "Operational", uptime: "99.95%", response: "45ms", icon: "📧" },
    { service: "Payment Gateway", status: "Operational", uptime: "99.99%", response: "89ms", icon: "💳" },
    { service: "SMS Service", status: "Operational", uptime: "99.90%", response: "234ms", icon: "💬" },
  ];

  const topPerformers = [
    { name: "Alice Johnson", role: "Sales Manager", performance: 98, revenue: 245000 },
    { name: "Bob Smith", role: "Sales Executive", performance: 90, revenue: 198000 },
    { name: "David Wilson", role: "Account Manager", performance: 95, revenue: 142000 },
  ];

  // KPI Card Component
  const KPICard = ({ title, value, subtext, trend, icon, changePercent, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && <p className="text-xs text-gray-600 mt-1">{trend}</p>}
          {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className="text-3xl ml-4 opacity-30">{icon}</div>
      </div>
      {changePercent !== undefined && (
        <div className="mt-3 flex items-center">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              changePercent >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {changePercent >= 0 ? "↑" : "↓"} {Math.abs(changePercent)}%
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {name}</h1>
          <p className="text-gray-600 mt-1">Here's your admin dashboard overview</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Total Employees"
          value={kpiData.employees.total}
          subtext={`${kpiData.employees.active} active`}
          trend={kpiData.employees.trend}
          icon="👥"
          changePercent={kpiData.employees.change}
        />
        <KPICard
          title="Total Customers"
          value={kpiData.customers.total.toLocaleString()}
          subtext={`${kpiData.customers.active} active`}
          trend={kpiData.customers.trend}
          icon="🤝"
          changePercent={kpiData.customers.change}
        />
        <KPICard
          title="Total Leads"
          value={kpiData.leads.total}
          subtext={`${kpiData.leads.qualified} qualified`}
          trend={kpiData.leads.trend}
          icon="🔥"
          changePercent={kpiData.leads.change}
        />
        <KPICard
          title="Support Tickets"
          value={kpiData.tickets.total}
          subtext={`${kpiData.tickets.open} open, ${kpiData.tickets.resolved} resolved`}
          trend="SLA Performance: 99.6%"
          icon="🎫"
          changePercent={kpiData.tickets.change}
        />
        <KPICard
          title="Total Revenue"
          value={`$${(kpiData.revenue.total / 1000000).toFixed(2)}M`}
          subtext={`MTD: $${(kpiData.revenue.mtd / 1000).toFixed(0)}K`}
          trend={kpiData.revenue.trend}
          icon="💰"
          changePercent={kpiData.revenue.change}
        />
        <KPICard
          title="Sales Pipeline"
          value={`$${(kpiData.sales.pipeline / 1000).toFixed(0)}K`}
          subtext={`${kpiData.sales.deals_in_progress} deals in progress`}
          trend={`Avg deal: $${kpiData.sales.avg_deal_size.toLocaleString()}`}
          icon="📈"
          changePercent={kpiData.sales.change}
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts & Analytics Section (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Trend Chart Placeholder */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">📈 Revenue Trend</h3>
              <select className="text-sm border border-gray-300 rounded px-2 py-1">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <p className="text-center">
                <span className="block mb-2">📊 Revenue Chart</span>
                <span className="text-xs">Monthly revenue trend visualization</span>
              </p>
            </div>
          </div>

          {/* Sales Pipeline Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💼 Sales Pipeline Breakdown</h3>
            <div className="space-y-3">
              {[
                { stage: "Lead In", value: 180000, percent: 20 },
                { stage: "Qualification", value: 220000, percent: 25 },
                { stage: "Proposal Sent", value: 250000, percent: 28 },
                { stage: "Negotiation", value: 150000, percent: 17 },
                { stage: "Closed Won", value: 90000, percent: 10 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{item.stage}</span>
                    <span className="text-gray-600">${(item.value / 1000).toFixed(0)}K ({item.percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Conversion Funnel */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Lead Conversion Funnel</h3>
            <div className="space-y-2">
              {[
                { stage: "Total Leads", value: 580, percent: 100 },
                { stage: "Qualified", value: 245, percent: 42 },
                { stage: "Proposal Sent", value: 156, percent: 27 },
                { stage: "Negotiation", value: 89, percent: 15 },
                { stage: "Closed Won", value: 67, percent: 12 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-32 text-sm font-medium text-gray-700">{item.stage}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-8 flex items-center px-3">
                      <div
                        className={`h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          idx === 0 ? "bg-blue-600" : idx === 1 ? "bg-blue-500" : idx === 2 ? "bg-blue-400" : idx === 3 ? "bg-blue-300" : "bg-green-500"
                        }`}
                        style={{ width: `${item.percent}%`, minWidth: "40px" }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 text-sm text-gray-600 w-12 text-right">{item.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⭐ Top Performers</h3>
            <div className="space-y-4">
              {topPerformers.map((performer, idx) => (
                <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.role}</p>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
                      <div className="bg-green-600 h-1 rounded-full" style={{ width: `${performer.performance}%` }} />
                    </div>
                  </div>
                  <div className="ml-3 text-right">
                    <p className="text-sm font-semibold text-gray-900">{performer.performance}%</p>
                    <p className="text-xs text-gray-500">${(performer.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health Status */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 System Health</h3>
            <div className="space-y-3">
              {systemHealth.map((service, idx) => (
                <div key={idx} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <span className="text-xl flex-shrink-0">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{service.service}</p>
                    <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                    <p className="text-xs text-green-600">Response: {service.response}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ OK
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                ➕ Add New Employee
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                👤 Add New Customer
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                📧 Send Campaign
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                📄 Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">📋 Recent Activity</h3>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </a>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 pb-3 border-b border-gray-100 last:border-0">
              <span className="text-2xl flex-shrink-0">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                <p className="text-xs text-gray-500">
                  by <span className="font-medium">{activity.user}</span> • {activity.time}
                </p>
              </div>
              {activity.value && <p className="text-sm font-semibold text-green-600">{activity.value}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
