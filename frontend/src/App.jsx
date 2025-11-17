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
import ServiceOrder from "./pages/Dashboard/ServiceOrder";

/* ---------------------- Dashboard Pages ---------------------- */
import DashboardIndex from "./pages/DashboardIndex";
import CompliancesPage from "./pages/Dashboard/CompliancesPage";
import CrmPage from "./pages/Dashboard/CrmPage";
import CalendarPage from "./pages/Dashboard/CalendarPage";
import DocumentsPage from "./pages/Dashboard/DocumentsPage";
import ReportsPage from "./pages/Dashboard/ReportsPage";
import ConsultPage from "./pages/Dashboard/ConsultPage";
import ServicesHub from "./pages/Dashboard/ServiceHub";
import UserHome from "./pages/Dashboard/HomePage";
import MyAccount from "./pages/MyAccount";

/* ---------------------- Dashboards ---------------------- */
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import OrderDetailPage from "./pages/Dashboard/OrderDetailPage";
import AdminReports from "./pages/Dashboard/AdminReports";
import AdminOrdersPage from "./pages/Dashboard/AdminOrdersPage";
import EmployeeTasksPage from "./pages/Dashboard/EmployeeTasksPage";
import EmployeeHomePage from "./pages/Dashboard/EmployeeHomePage";
import AdminHome from "./pages/Dashboard/AdminHome";

/* ---------------------- Admin Modules ---------------------- */
const AdminEmployees = React.lazy(() => import("./pages/Dashboard/AdminEmployees"));
const AdminAttendance = React.lazy(() => import("./pages/Dashboard/AdminAttendance"));
const AdminPerformance = React.lazy(() => import("./pages/Dashboard/AdminPerformance"));
const AdminCustomerLifecycle = React.lazy(() => import("./pages/Dashboard/AdminCustomerLifecycle"));
const AdminSalesReports = React.lazy(() => import("./pages/Dashboard/AdminSalesReports"));
const AdminSettings = React.lazy(() => import("./pages/Dashboard/AdminSettings"));
const AdminLeadReport = React.lazy(() => import("./pages/Dashboard/AdminLeadReport"));
const AdminDealReport = React.lazy(() => import("./pages/Dashboard/AdminDealReport"));
const AdminEmployeeAttendanceReport = React.lazy(() => import("./pages/Dashboard/AdminEmployeeAttendanceReport"));

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
          </Route>

          {/* ---------------------- EMPLOYEE DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/employee"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployeeHomePage />} />
            <Route path="assigned" element={<EmployeeTasksPage />} />
            <Route path="task/:orderId" element={<OrderDetailPage />} />
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
      return <EmployeeDashboard />;
    case "USER":
      return <UserDashboard />;
    default:
      return <ServiceLoader />;
  }
}
