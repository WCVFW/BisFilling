import React, { useState } from "react";

const AdminSalesReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [reportType, setReportType] = useState("overview");
  const [exportFormat, setExportFormat] = useState("pdf");

  // Mock sales data for charts
  const monthlySalesData = [
    { month: "Jan", revenue: 85000, target: 90000, deals: 8, conversion: 65 },
    { month: "Feb", revenue: 92000, target: 90000, deals: 10, conversion: 68 },
    { month: "Mar", revenue: 78000, target: 90000, deals: 7, conversion: 62 },
    { month: "Apr", revenue: 105000, target: 90000, deals: 12, conversion: 72 },
    { month: "May", revenue: 98000, target: 90000, deals: 11, conversion: 70 },
    { month: "Jun", revenue: 110000, target: 90000, deals: 13, conversion: 75 },
  ];

  const salesByPerson = [
    { name: "Alice Johnson", revenue: 245000, target: 250000, deals: 12, percentage: 98 },
    { name: "Bob Smith", revenue: 198000, target: 220000, deals: 9, percentage: 90 },
    { name: "Carol Davis", revenue: 165000, target: 200000, deals: 7, percentage: 83 },
    { name: "David Wilson", revenue: 142000, target: 150000, deals: 8, percentage: 95 },
  ];

  const salesByRegion = [
    { region: "North", revenue: 385000, deals: 35, growth: 12 },
    { region: "South", revenue: 320000, deals: 28, growth: 8 },
    { region: "East", revenue: 290000, deals: 26, growth: 15 },
    { region: "West", revenue: 275000, deals: 24, growth: 5 },
  ];

  const dealsByStage = [
    { stage: "Lead In", count: 45, value: 185000, avgDealSize: 4111 },
    { stage: "Qualification", count: 38, value: 220000, avgDealSize: 5789 },
    { stage: "Proposal Sent", count: 28, value: 250000, avgDealSize: 8929 },
    { stage: "Negotiation", count: 18, value: 210000, avgDealSize: 11667 },
    { stage: "Closed Won", count: 12, value: 180000, avgDealSize: 15000 },
  ];

  const conversionData = [
    { stage: "Lead to Opportunity", rate: 68, previous: 65 },
    { stage: "Proposal to Close", rate: 72, previous: 68 },
    { stage: "First Contact to Deal", rate: 45, previous: 42 },
  ];

  const handleExport = () => {
    console.log(`Exporting ${reportType} as ${exportFormat}`);
    alert(`Report exported as ${exportFormat.toUpperCase()}`);
  };

  // Chart placeholder component
  const ChartPlaceholder = ({ title, height = "h-64" }) => (
    <div className={`flex flex-col items-center justify-center ${height} border border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-500`}>
      <svg
        className="w-12 h-12 mb-3 opacity-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <p className="text-sm">{title}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Sales Performance Reports</h1>
          <p className="mt-1 text-gray-600">Comprehensive sales analytics and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="overview">Overview</option>
            <option value="detailed">Detailed</option>
            <option value="forecast">Forecast</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
          >
            ⬇️ Export
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-xs font-medium uppercase">Total Revenue</p>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">$568K</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600 font-semibold">↑ 12%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-xs font-medium uppercase">Total Deals</p>
            <span className="text-2xl">🎯</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">67</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600 font-semibold">↑ 8%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-xs font-medium uppercase">Avg Deal Size</p>
            <span className="text-2xl">💵</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">$8.5K</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600 font-semibold">↑ 3%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-xs font-medium uppercase">Conversion Rate</p>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">68%</p>
          <div className="flex items-center mt-2 text-sm">
            <span className="text-green-600 font-semibold">↑ 5%</span>
            <span className="text-gray-500 ml-2">vs last period</span>
          </div>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last Year</option>
          </select>
        </div>
        <ChartPlaceholder title="Revenue vs Target - Line/Bar Chart" height="h-72" />
        <div className="mt-6 grid grid-cols-6 gap-2">
          {monthlySalesData.map((data, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xs font-medium text-gray-700 mb-2">{data.month}</div>
              <div className="bg-gray-200 rounded h-24">
                <div
                  className="bg-blue-600 rounded w-full"
                  style={{ height: `${(data.revenue / 110000) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2">${(data.revenue / 1000).toFixed(0)}K</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales by Person and Region */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Person */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales by Person</h2>
          <div className="space-y-4">
            {salesByPerson.map((person, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.deals} deals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">${(person.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-500">Target: ${(person.target / 1000).toFixed(0)}K</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${person.percentage}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">{person.percentage}% of target</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Region */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales by Region</h2>
          <div className="space-y-4">
            {salesByRegion.map((region, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">{region.region}</p>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">${(region.revenue / 1000).toFixed(0)}K</p>
                    <div className={`text-xs font-semibold ${region.growth >= 10 ? "text-green-600" : region.growth >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                      {region.growth >= 0 ? "↑" : "↓"} {region.growth}%
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{region.deals} deals</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deal Pipeline Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Deal Pipeline Analysis</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Deals by Stage</h3>
            <div className="space-y-3">
              {dealsByStage.map((deal, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium text-gray-700">{deal.stage}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-8 flex items-center px-2">
                    <div
                      className={`h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        idx === 0 ? "bg-blue-500" : idx === 1 ? "bg-blue-500" : idx === 2 ? "bg-blue-600" : idx === 3 ? "bg-purple-600" : "bg-green-600"
                      }`}
                      style={{ width: `${(deal.count / 45) * 100}%`, minWidth: "40px" }}
                    >
                      {deal.count}
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm text-gray-700">${(deal.value / 1000).toFixed(0)}K</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Average Deal Size by Stage</h3>
            <div className="space-y-3">
              {dealsByStage.map((deal, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{deal.stage}</span>
                  <span className="text-lg font-bold text-blue-600">${(deal.avgDealSize / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Rate Trends */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate Trends</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Conversion Stage</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Current Rate</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Previous Rate</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Change</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {conversionData.map((conv, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{conv.stage}</td>
                  <td className="px-4 py-3 text-center text-gray-900 font-bold">{conv.rate}%</td>
                  <td className="px-4 py-3 text-center text-gray-600">{conv.previous}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${conv.rate > conv.previous ? "text-green-600" : "text-red-600"}`}>
                      {conv.rate > conv.previous ? "↑" : "↓"} {Math.abs(conv.rate - conv.previous)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${conv.rate > conv.previous ? "bg-green-600" : "bg-red-600"}`}
                        style={{ width: `${conv.rate}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Reports</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Summary</option>
              <option>Detailed</option>
              <option>Executive</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleExport}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesReports;
