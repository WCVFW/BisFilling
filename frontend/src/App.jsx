import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

/* ---------------------- Pages ---------------------- */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TalkToCA from "./pages/ConsultanExpert/talkToCA";
import TalkToIP from "./pages/ConsultanExpert/talkToIP";
import ServiceOrder from "./pages/Dashboard/userDSB/ServiceOrder";

/* ---------------------- Dashboard Pages ---------------------- */
import DashboardIndex from "./pages/DashboardIndex";
import CompliancesPage from "./pages/Dashboard/userDSB/CompliancesPage";
import CrmPage from "./pages/Dashboard/CrmPage";
import CalendarPage from "./pages/Dashboard/userDSB/CalendarPage";
import DocumentsPage from "./pages/Dashboard/userDSB/DocumentsPage";
import ReportsPage from "./pages/Dashboard/userDSB/ReportsPage";
import ConsultPage from "./pages/Dashboard/userDSB/ConsultPage";
import ServicesHub from "./pages/Dashboard/userDSB/ServiceHub";
import UserHome from "./pages/Dashboard/userDSB/HomePage";
import MyAccount from "./pages/MyAccount";

/* ---------------------- Dashboards ---------------------- */
import AdminDashboard from "./pages/Dashboard/AdminDSB/AdminDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDSB/EmployeeDashboard";
import UserDashboard from "./pages/Dashboard/userDSB/UserDashboard";
import OrderDetailPage from "./pages/Dashboard/userDSB/OrderDetailPage";
import AdminReports from "./pages/Dashboard/AdminDSB/AdminReports";
import AdminOrdersPage from "./pages/Dashboard/AdminDSB/AdminOrdersPage";
import EmployeeTasksPage from "./pages/Dashboard/EmployeeDSB/EmployeeTasksPage";
import EmployeeHomePage from "./pages/Dashboard/EmployeeDSB/EmployeeHomePage";
import AdminHome from "./pages/Dashboard/AdminDSB/AdminHome";

// --- Import the new Employee Dashboard pages ---
import EmployeeAttendancePage from "./pages/Dashboard/EmployeeDSB/EmployeeAttendancePage";
import EmployeeSalesPage from "./pages/Dashboard/EmployeeDSB/EmployeeSalesPage";
import EmployeeReportsPage from "./pages/Dashboard/EmployeeDSB/EmployeeReportsPage";
import EmployeeContactPage from "./pages/Dashboard/EmployeeDSB/EmployeeContactPage";
import EmployeeCompanyPage from "./pages/Dashboard/EmployeeDSB/EmployeeCompanyPage";
import EmployeeCalendarPage from "./pages/Dashboard/EmployeeDSB/EmployeeCalendarPage";

/* ---------------------- Admin Modules ---------------------- */
const AdminEmployees = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminEmployees"));
const AdminAttendance = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminAttendance"));
const AdminPerformance = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminPerformance"));
const AdminCustomerLifecycle = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminCustomerLifecycle"));
const AdminSalesReports = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminSalesReports"));
const AdminSettings = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminSettings"));
const AdminLeadReport = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminLeadReport"));
const AdminDealReport = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminDealReport"));
const AdminNotifications = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminNotifications"));
const AdminEmployeeAttendanceReport = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminEmployeeAttendanceReport"));
const AdminLeads = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminLeads"));
const AdminDeals = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminDeals"));
const AdminCrmDashboard = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminCrm/AdminCrmDashboard"));
const AdminCustomerList = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminCrm/AdminCustomerList"));
const AdminCustomerDetail = React.lazy(() => import("./pages/Dashboard/AdminDSB/AdminCrm/AdminCustomerDetail"));

/* ---------------------- Agent Modules ---------------------- */
const AgentDashboard = React.lazy(() => import("./pages/Dashboard/AgentDSB/AgentDashboard"));
const AgentHome = React.lazy(() => import("./pages/Dashboard/AgentDSB/AgentHome"));
const AgentWallet = React.lazy(() => import("./pages/Dashboard/AgentDSB/AgentWallet"));
const AgentOrders = React.lazy(() => import("./pages/Dashboard/AgentDSB/AgentOrders"));

/* ---------------------- Components ---------------------- */
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ServiceLoader from "./pages/ServiceLoader";
import CheckoutModal from "./components/CheckoutModal";

/* ---------------------- Auth ---------------------- */
import { getAuth, clearAuth } from "./lib/auth";

/* ===============================
 🔹 MAIN APP COMPONENT
 =============================== */
export default function App() {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ React Router navigation

  /* ---------------------- Auth Initialization ---------------------- */
  useEffect(() => {
    const authData = getAuth();
    setUser(authData?.user || null);

    const handler = () => {
      const updatedAuthData = getAuth();
      setUser(updatedAuthData?.user || null);
    };
    window.addEventListener("auth:update", handler);
    return () => window.removeEventListener("auth:update", handler);
  }, []);

  /* ---------------------- Location & Notification on Load ---------------------- */
  useEffect(() => {
    // 1. Geolocation Request
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // You can now use these coordinates, e.g., send them to your backend.
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    // 2. Notification Request
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          new Notification('Welcome to BisFilling!', {
            body: 'We are glad to have you here. We can now send you important updates.',
          });
        }
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount.

  /* ---------------------- Logout Function ---------------------- */
  const logout = () => {
    clearAuth();
    setUser(null);
    window.dispatchEvent(new Event("auth:update"));
    navigate("/", { replace: true }); // ✅ Smooth redirect without reload
  };

  /* ---------------------- Page Loading Animation ---------------------- */
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  /* ---------------------- Layout Visibility ---------------------- */
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/ConsultanExpert/talkToIP" ||
    location.pathname.startsWith("/dashboard");

  /* ---------------------- Full Width Logic ---------------------- */
  const isHome = location.pathname === "/";
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <PageLoader show={pageLoading} />

      {/* Header should not show on Dashboard or Auth pages */}
      {!hideLayout && <Header user={user} logout={logout} />}

      {/* MAIN CONTENT AREA */}
      <main
        className={
          isDashboard
            ? "flex-1 w-full" // ✅ Full-width for dashboard
            : isHome
              ? "flex-1 w-full"
              : "container flex-1 mx-auto px-4"
        }
      >
        <Routes>
          {/* ---------------------- Public Pages ---------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/ConsultanExpert/talkToCA" element={<TalkToCA />} />
          <Route path="/ConsultanExpert/talkToIP" element={<TalkToIP />} />

          {/* ---------------------- Dashboard Router ---------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter user={user} />
              </ProtectedRoute>
            }
          />

          {/* ---------------------- USER DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardIndex />} />
            <Route path="compliances" element={<CompliancesPage />} />
            <Route path="Home" element={<UserHome />} />
            <Route path="servicehub" element={<ServicesHub />} />
            <Route path="my-orders" element={<DashboardIndex />} />
            <Route path="service-order" element={<ServiceOrder />} />
            <Route path="crm" element={<CrmPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="consult" element={<ConsultPage />} />
            <Route path="profile" element={<MyAccount />} />
          </Route>

          {/* ---------------------- ADMIN DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHome />} />
            <Route
              path="employees"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminEmployees />
                </React.Suspense>
              }
            />
            <Route
              path="attendance"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminAttendance />
                </React.Suspense>
              }
            />
            <Route
              path="performance"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminPerformance />
                </React.Suspense>
              }
            />
            <Route
              path="customers"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminCustomerLifecycle />
                </React.Suspense>
              }
            />
            <Route
              path="sales-reports"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminSalesReports />
                </React.Suspense>
              }
            />
            <Route
              path="settings"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminSettings />
                </React.Suspense>
              }
            />
            <Route path="reports" element={<AdminReports />} />
            <Route
              path="lead-report"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminLeadReport />
                </React.Suspense>
              }
            />
            <Route
              path="deal-report"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminDealReport />
                </React.Suspense>
              }
            />
            <Route
              path="employee-attendance-report"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminEmployeeAttendanceReport />
                </React.Suspense>
              }
            />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="profile" element={<MyAccount />} />
            <Route
              path="notifications"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminNotifications />
                </React.Suspense>
              }
            />
            <Route
              path="leads"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminLeads />
                </React.Suspense>
              }
            />
            <Route
              path="deals"
              element={
                <React.Suspense fallback={<ServiceLoader />}>
                  <AdminDeals />
                </React.Suspense>
              }
            />

            {/* CRM Module Routes */}
            <Route path="crm" element={<React.Suspense fallback={<ServiceLoader />}><AdminCrmDashboard /></React.Suspense>} />
            <Route path="crm/customers" element={<React.Suspense fallback={<ServiceLoader />}><AdminCustomerList /></React.Suspense>} />
            <Route path="crm/customer/:id" element={<React.Suspense fallback={<ServiceLoader />}><AdminCustomerDetail /></React.Suspense>} />
          </Route>

          {/* ---------------------- EMPLOYEE DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/employee"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <EmployeeDashboard user={user} />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeHomePage />} />
            {/* Changed 'assigned' to 'tasks' to match the sidebar link */}
            <Route path="tasks" element={<EmployeeTasksPage />} />
            {/* Added route for a single task with :taskId as requested */}
            <Route path="task/:taskId" element={<OrderDetailPage />} />
            <Route path="profile" element={<MyAccount />} />
            {/* --- Add routes for the new pages --- */}
            <Route path="attendance" element={<EmployeeAttendancePage />} />
            <Route path="sales" element={<EmployeeSalesPage />} />
            <Route path="reports" element={<EmployeeReportsPage />} />
            <Route path="contact" element={<EmployeeContactPage />} />
            <Route path="company" element={<EmployeeCompanyPage />} />
            <Route path="calendar" element={<EmployeeCalendarPage />} />
          </Route>

          {/* ---------------------- AGENT DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/agent"
            element={
              <ProtectedRoute allowedRoles={["AGENT"]}>
                <React.Suspense fallback={<ServiceLoader />}>
                  <AgentDashboard user={user} />
                </React.Suspense>
              </ProtectedRoute>
            }
          >
            <Route index element={<React.Suspense fallback={<ServiceLoader />}><AgentHome /></React.Suspense>} />
            <Route path="wallet" element={<React.Suspense fallback={<ServiceLoader />}><AgentWallet /></React.Suspense>} />
            <Route path="orders" element={<React.Suspense fallback={<ServiceLoader />}><AgentOrders /></React.Suspense>} />
            <Route path="profile" element={<MyAccount />} />
          </Route>

          {/* ---------------------- Public Order Detail ---------------------- */}
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            }
          />

          {/* ---------------------- Fallback ---------------------- */}
          <Route path="*" element={<ServiceLoader />} />
        </Routes>
      </main>

      {/* Footer hidden on dashboard/auth pages */}
      {!hideLayout && <Footer />}

      <CheckoutModal />
    </div>
  );
}

/* ===============================
 🔹 ROLE-BASED DASHBOARD ROUTER
 =============================== */
function DashboardRouter({ user }) {
  if (!user) return <DashboardIndex />;

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "EMPLOYEE":
      return <EmployeeDashboard user={user} />;
    case "AGENT":
      return <React.Suspense fallback={<ServiceLoader />}><AgentDashboard user={user} /></React.Suspense>;
    case "USER":
      return <UserDashboard />;
    default:
      return <ServiceLoader />;
  }
}
