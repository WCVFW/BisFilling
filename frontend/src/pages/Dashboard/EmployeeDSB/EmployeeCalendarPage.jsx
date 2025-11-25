import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle
} from "lucide-react";
import { orderAPI } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function EmployeeCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userStr = localStorage.getItem("authUser");
      const user = userStr ? JSON.parse(userStr) : null;
      if (user?.email) {
        const res = await orderAPI.listAssigned(user.email);
        setTasks(res.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch tasks for calendar", err);
    } finally {
      setLoading(false);
    }
  };

  // Calendar Logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);
  const daysArray = Array.from({ length: days }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const getTasksForDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasks.filter(t => {
      const taskDate = new Date(t.createdAt); // Using createdAt as the event date
      return isSameDay(taskDate, date);
    });
  };

  const selectedTasks = tasks.filter(t => isSameDay(new Date(t.createdAt), selectedDate));

  return (
    <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600 mt-1">Manage your schedule and deadlines.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-lg font-bold text-gray-800 w-40 text-center">
            {currentDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 overflow-y-auto">
          <div className="grid grid-cols-7 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {blanks.map(i => <div key={`blank-${i}`} className="h-32"></div>)}

            {daysArray.map(day => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const dayTasks = getTasksForDate(day);
              const isSelected = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={`h-32 rounded-2xl border p-3 cursor-pointer transition-all hover:shadow-md flex flex-col gap-1
                    ${isSelected ? 'border-[#5E33AC] ring-2 ring-[#5E33AC]/20 bg-purple-50' : 'border-gray-100 bg-white hover:border-purple-200'}
                  `}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                      ${isToday ? 'bg-[#5E33AC] text-white' : 'text-gray-700'}
                    `}>
                      {day}
                    </span>
                    {dayTasks.length > 0 && (
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 overflow-hidden space-y-1">
                    {dayTasks.slice(0, 2).map((t, i) => (
                      <div key={i} className="text-[10px] truncate px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                        {t.serviceName || `Order #${t.id}`}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <div className="text-[10px] text-gray-400 pl-1">
                        + {dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Panel: Selected Date Tasks */}
        <div className="w-96 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="mb-6 pb-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedDate.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {selectedTasks.length} tasks scheduled
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {selectedTasks.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No tasks for this day.</p>
              </div>
            ) : (
              selectedTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => navigate(`/dashboard/employee/task/${task.id}`)}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-purple-50 hover:border-purple-100 transition-colors cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#5E33AC] bg-purple-100 px-2 py-1 rounded-md">
                      #{task.id}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}>
                      {task.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-[#5E33AC] transition-colors">
                    {task.serviceName || "Service Order"}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}