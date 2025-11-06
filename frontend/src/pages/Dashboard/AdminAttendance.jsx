import React, { useState } from "react";

const AdminAttendance = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-01");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    type: "Sick Leave",
    reason: "",
  });

  // Mock attendance data
  const employees = [
    { id: 1, name: "Alice Johnson", department: "Sales", status: "Active" },
    { id: 2, name: "Bob Smith", department: "Sales", status: "Active" },
    { id: 3, name: "Carol Davis", department: "Sales", status: "Active" },
    { id: 4, name: "David Wilson", department: "Customer Success", status: "Active" },
    { id: 5, name: "Emma Brown", department: "Operations", status: "Active" },
  ];

  const attendanceData = {
    "2025-01": [
      { date: "2025-01-01", present: [1, 2, 3, 4, 5], absent: [], leave: [] },
      { date: "2025-01-02", present: [1, 2, 3, 4, 5], absent: [], leave: [] },
      { date: "2025-01-03", present: [1, 3, 4, 5], absent: [2], leave: [] },
      { date: "2025-01-04", present: [1, 2, 3, 4], absent: [], leave: [5] },
      { date: "2025-01-05", present: [1, 2, 3, 4, 5], absent: [], leave: [] },
      { date: "2025-01-06", present: [1, 2, 4, 5], absent: [3], leave: [] },
      { date: "2025-01-07", present: [1, 2, 3, 4, 5], absent: [], leave: [] },
      { date: "2025-01-08", present: [1, 3, 4, 5], absent: [], leave: [2] },
      { date: "2025-01-09", present: [2, 3, 4, 5], absent: [1], leave: [] },
      { date: "2025-01-10", present: [1, 2, 3, 4, 5], absent: [], leave: [] },
    ],
  };

  const leaveRequests = [
    { id: 1, employee: "Alice Johnson", type: "Sick Leave", startDate: "2025-01-15", endDate: "2025-01-15", reason: "Medical appointment", status: "Approved" },
    { id: 2, employee: "Bob Smith", type: "Annual Leave", startDate: "2025-01-20", endDate: "2025-01-24", reason: "Vacation", status: "Pending" },
    { id: 3, employee: "Carol Davis", type: "Casual Leave", startDate: "2025-01-08", endDate: "2025-01-08", reason: "Personal work", status: "Approved" },
    { id: 4, employee: "David Wilson", type: "Sick Leave", startDate: "2025-01-10", endDate: "2025-01-10", reason: "Fever", status: "Rejected" },
    { id: 5, employee: "Emma Brown", type: "Annual Leave", startDate: "2025-01-25", endDate: "2025-02-01", reason: "Family trip", status: "Pending" },
  ];

  const monthData = attendanceData[selectedMonth] || [];

  const getAttendanceStats = () => {
    if (monthData.length === 0) return { present: 0, absent: 0, leave: 0, percentage: 0 };
    const totalDays = monthData.length * employees.length;
    const presentDays = monthData.reduce((sum, day) => sum + day.present.length, 0);
    const absentDays = monthData.reduce((sum, day) => sum + day.absent.length, 0);
    const leaveDays = monthData.reduce((sum, day) => sum + day.leave.length, 0);
    return {
      present: presentDays,
      absent: absentDays,
      leave: leaveDays,
      percentage: totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0,
    };
  };

  const getEmployeeStats = (empId) => {
    const present = monthData.filter(day => day.present.includes(empId)).length;
    const absent = monthData.filter(day => day.absent.includes(empId)).length;
    const leave = monthData.filter(day => day.leave.includes(empId)).length;
    const total = monthData.length;
    return { present, absent, leave, total };
  };

  const stats = getAttendanceStats();

  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-800";
    if (status === "Pending") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const handleAddLeave = () => {
    if (leaveForm.employeeId && leaveForm.startDate && leaveForm.endDate) {
      console.log("Leave request added:", leaveForm);
      setLeaveForm({ employeeId: "", startDate: "", endDate: "", type: "Sick Leave", reason: "" });
      setShowLeaveModal(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Attendance & Leave Tracking</h1>
          <p className="mt-1 text-gray-600">Monitor employee attendance and manage leave requests</p>
        </div>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ➕ New Leave Request
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Present Days</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
            </div>
            <div className="text-3xl opacity-30">✓</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Absent Days</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.absent}</p>
            </div>
            <div className="text-3xl opacity-30">✗</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Leave Days</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.leave}</p>
            </div>
            <div className="text-3xl opacity-30">🏖️</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium uppercase">Attendance %</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.percentage}%</p>
            </div>
            <div className="text-3xl opacity-30">📈</div>
          </div>
        </div>
      </div>

      {/* Month Selector and Attendance Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Section */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attendance Calendar</h3>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Employee Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Present</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Absent</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Leave</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Percentage</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => {
                  const empStats = getEmployeeStats(emp.id);
                  const attendancePercent = empStats.total > 0 ? Math.round((empStats.present / empStats.total) * 100) : 0;
                  const statusColor = attendancePercent >= 85 ? "text-green-600" : attendancePercent >= 75 ? "text-yellow-600" : "text-red-600";

                  return (
                    <tr key={emp.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedEmployee(emp.id)}
                          className="text-gray-900 font-medium hover:text-blue-600 cursor-pointer"
                        >
                          {emp.name}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {empStats.present}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {empStats.absent}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {empStats.leave}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-semibold ${statusColor}`}>{attendancePercent}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          attendancePercent >= 85 ? "bg-green-100 text-green-800" : 
                          attendancePercent >= 75 ? "bg-yellow-100 text-yellow-800" : 
                          "bg-red-100 text-red-800"
                        }`}>
                          {attendancePercent >= 85 ? "Good" : attendancePercent >= 75 ? "Fair" : "Poor"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Daily Attendance View */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Summary</h3>
          <div className="space-y-2">
            {monthData.slice(0, 10).map((day) => (
              <div key={day.date} className="p-3 border border-gray-200 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{day.date}</p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">✓ {day.present.length}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded">✗ {day.absent.length}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">🏖️ {day.leave.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Employee</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Start Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">End Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Reason</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaveRequests.map((req) => {
                const startDate = new Date(req.startDate);
                const endDate = new Date(req.endDate);
                const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

                return (
                  <tr key={req.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{req.employee}</td>
                    <td className="px-4 py-3 text-gray-700">{req.type}</td>
                    <td className="px-4 py-3 text-gray-700">{req.startDate}</td>
                    <td className="px-4 py-3 text-gray-700">{req.endDate}</td>
                    <td className="px-4 py-3 text-gray-700">{duration} day(s)</td>
                    <td className="px-4 py-3 text-gray-700">{req.reason}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "Pending" && (
                        <div className="flex items-center gap-2">
                          <button className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">Approve</button>
                          <button className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Reject</button>
                        </div>
                      )}
                      {req.status !== "Pending" && (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Leave Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  value={leaveForm.employeeId}
                  onChange={(e) => setLeaveForm({ ...leaveForm, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Sick Leave</option>
                  <option>Annual Leave</option>
                  <option>Casual Leave</option>
                  <option>Maternity Leave</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={leaveForm.startDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={leaveForm.endDate}
                  onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter reason for leave"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLeave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;
