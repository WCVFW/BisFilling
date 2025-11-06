import React, { useState } from "react";

const AdminCustomerLifecycle = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterStage, setFilterStage] = useState("All");

  // Mock customer data with lifecycle stages
  const customers = [
    {
      id: 1,
      name: "Tony Stark Industries",
      email: "tony@stark.com",
      phone: "555-0101",
      industry: "Tech",
      stage: "Customer",
      value: 450000,
      acquisitionDate: "2024-01-15",
      lastInteraction: "2025-01-28",
      interactions: 24,
      totalSpent: 450000,
      lifetime: 3456,
      health: "Excellent",
      mainContact: "Tony Stark",
    },
    {
      id: 2,
      name: "Steve Rogers Defense",
      email: "steve@avengers.com",
      phone: "555-0102",
      industry: "Defense",
      stage: "Lead",
      value: 120000,
      acquisitionDate: "2024-03-20",
      lastInteraction: "2025-01-20",
      interactions: 8,
      totalSpent: 0,
      lifetime: 0,
      health: "At Risk",
      mainContact: "Steve Rogers",
    },
    {
      id: 3,
      name: "Natasha Romanoff Security",
      email: "natasha@shield.org",
      phone: "555-0103",
      industry: "Security",
      stage: "Customer",
      value: 380000,
      acquisitionDate: "2023-11-01",
      lastInteraction: "2025-01-25",
      interactions: 42,
      totalSpent: 380000,
      lifetime: 6234,
      health: "Excellent",
      mainContact: "Natasha Romanoff",
    },
    {
      id: 4,
      name: "Bruce Banner Research",
      email: "bruce@banner.com",
      phone: "555-0104",
      industry: "Research",
      stage: "Prospect",
      value: 85000,
      acquisitionDate: "2024-06-10",
      lastInteraction: "2025-01-15",
      interactions: 5,
      totalSpent: 0,
      lifetime: 0,
      health: "Good",
      mainContact: "Bruce Banner",
    },
    {
      id: 5,
      name: "Wanda Maximoff Solutions",
      email: "wanda@maximoff.com",
      phone: "555-0105",
      industry: "Tech",
      stage: "Churned",
      value: 0,
      acquisitionDate: "2023-08-01",
      lastInteraction: "2024-11-20",
      interactions: 18,
      totalSpent: 220000,
      lifetime: 5678,
      health: "Churned",
      mainContact: "Wanda Maximoff",
    },
  ];

  const stages = [
    { name: "Prospect", icon: "🔍", color: "bg-blue-100 text-blue-800", description: "Initial contact" },
    { name: "Lead", icon: "🎯", color: "bg-yellow-100 text-yellow-800", description: "Engaged prospect" },
    { name: "Customer", icon: "💰", color: "bg-green-100 text-green-800", description: "Active customer" },
    { name: "Loyal", icon: "⭐", color: "bg-purple-100 text-purple-800", description: "High value" },
    { name: "Churned", icon: "❌", color: "bg-red-100 text-red-800", description: "Inactive" },
  ];

  const interactions = [
    { id: 1, customerId: 1, type: "Email", subject: "Q1 Contract Review", date: "2025-01-28", notes: "Discussed new features and pricing" },
    { id: 2, customerId: 1, type: "Call", subject: "Monthly Check-in", date: "2025-01-25", notes: "Update on project status" },
    { id: 3, customerId: 1, type: "Meeting", subject: "Quarterly Business Review", date: "2025-01-20", notes: "Strategic planning session" },
    { id: 4, customerId: 2, type: "Email", subject: "Proposal Sent", date: "2025-01-20", notes: "Initial proposal for services" },
    { id: 5, customerId: 3, type: "Support", subject: "Technical Support", date: "2025-01-25", notes: "API integration assistance" },
  ];

  // Filter customers by stage
  const filteredCustomers =
    filterStage === "All"
      ? customers
      : customers.filter((c) => c.stage === filterStage);

  // Get customer interactions
  const getCustomerInteractions = (customerId) => {
    return interactions.filter((i) => i.customerId === customerId);
  };

  // Lifecycle funnel data
  const funnelData = [
    { stage: "Prospects", count: 15, percentage: 100 },
    { stage: "Leads", count: 12, percentage: 80 },
    { stage: "Customers", count: 8, percentage: 53 },
    { stage: "Loyal", count: 4, percentage: 27 },
  ];

  const getStageColor = (stage) => {
    const stageObj = stages.find((s) => s.name === stage);
    return stageObj ? stageObj.color : "bg-gray-100 text-gray-800";
  };

  const getHealthColor = (health) => {
    if (health === "Excellent") return "text-green-600 bg-green-50";
    if (health === "Good") return "text-blue-600 bg-blue-50";
    if (health === "At Risk") return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Customer Lifecycle & Interactions</h1>
          <p className="mt-1 text-gray-600">Track customer journey and manage interactions</p>
        </div>
        <div className="flex gap-3">
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option>All</option>
            {stages.map((stage) => (
              <option key={stage.name} value={stage.name}>
                {stage.icon} {stage.name}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            ➕ Add Customer
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Total Customers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{customers.filter((c) => c.stage === "Customer").length}</p>
            </div>
            <div className="text-3xl opacity-30">💰</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${(customers.reduce((sum, c) => sum + c.totalSpent, 0) / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="text-3xl opacity-30">💵</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Avg Lifetime Value</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                ${Math.round(customers.reduce((sum, c) => sum + c.lifetime, 0) / customers.filter((c) => c.lifetime > 0).length) || 0}
              </p>
            </div>
            <div className="text-3xl opacity-30">📊</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Retention Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">92%</p>
            </div>
            <div className="text-3xl opacity-30">📈</div>
          </div>
        </div>
      </div>

      {/* Lifecycle Funnel */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Lifecycle Funnel</h2>
        <div className="space-y-4">
          {funnelData.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <div className="w-32 font-medium text-gray-700">{item.stage}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-10 flex items-center px-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ width: `${item.percentage}%` }}
                  >
                    {item.count}
                  </div>
                </div>
              </div>
              <div className="ml-4 text-right w-16">
                <span className="font-semibold text-gray-900">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customers Grid and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {filterStage === "All" ? "All Customers" : `${filterStage} Customers`} ({filteredCustomers.length})
          </h2>
          <div className="space-y-3">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`bg-white border rounded-lg p-4 shadow-sm cursor-pointer transition-all hover:shadow-lg ${
                  selectedCustomer?.id === customer.id ? "border-blue-600 shadow-lg" : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{customer.mainContact}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor(customer.stage)}`}>
                        {customer.stage}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getHealthColor(customer.health)}`}>
                        {customer.health}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">${(customer.value / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-gray-500">Potential Value</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Detail View */}
        {selectedCustomer && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit sticky top-20">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Details</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Customer Name</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{selectedCustomer.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Contact</p>
                <p className="text-sm text-gray-700 mt-1">{selectedCustomer.mainContact}</p>
                <p className="text-sm text-gray-700">{selectedCustomer.email}</p>
                <p className="text-sm text-gray-700">{selectedCustomer.phone}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium uppercase">Industry</p>
                <p className="text-sm text-gray-900 mt-1">{selectedCustomer.industry}</p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-medium uppercase mb-2">Financial Metrics</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-semibold text-gray-900">${(selectedCustomer.totalSpent / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lifetime Value</span>
                    <span className="font-semibold text-gray-900">${(selectedCustomer.lifetime / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interactions</span>
                    <span className="font-semibold text-gray-900">{selectedCustomer.interactions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Interaction</span>
                    <span className="font-semibold text-gray-900">{selectedCustomer.lastInteraction}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-medium uppercase mb-3">Recent Interactions</p>
                <div className="space-y-2">
                  {getCustomerInteractions(selectedCustomer.id).slice(0, 3).map((interaction) => (
                    <div key={interaction.id} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-gray-700">{interaction.type}</span>
                        <span className="text-gray-500">{interaction.date}</span>
                      </div>
                      <p className="text-xs text-gray-600">{interaction.subject}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  Add Interaction
                </button>
                <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All Interactions */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Interactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Subject</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {interactions.map((interaction) => {
                const customer = customers.find((c) => c.id === interaction.customerId);
                const typeColors = {
                  Email: "bg-blue-100 text-blue-800",
                  Call: "bg-green-100 text-green-800",
                  Meeting: "bg-purple-100 text-purple-800",
                  Support: "bg-orange-100 text-orange-800",
                };

                return (
                  <tr key={interaction.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-700">{interaction.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{customer?.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[interaction.type] || "bg-gray-100"}`}>
                        {interaction.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{interaction.subject}</td>
                    <td className="px-4 py-3 text-gray-600">{interaction.notes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerLifecycle;
