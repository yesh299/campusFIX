import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { NotificationProvider } from "./context/NotificationContext";

// Guards & Layout
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Layout from "./components/layout/Layout";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaintPage from "./pages/SubmitComplaintPage";
import MyComplaintsPage from "./pages/MyComplaintsPage";
import ComplaintDetailsPage from "./pages/ComplaintDetailsPage";
import StudentProfilePage from "./pages/StudentProfilePage";
import HelpPage from "./pages/HelpPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintsPage from "./pages/AdminComplaintsPage";
import AdminUsersPage from "./pages/AdminUsersPage";

import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Student Protected Portal Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/complaints" element={<MyComplaintsPage />} />
                  <Route
                    path="/complaints/new"
                    element={<SubmitComplaintPage />}
                  />
                  <Route
                    path="/complaints/:id"
                    element={<ComplaintDetailsPage />}
                  />
                  <Route path="/profile" element={<StudentProfilePage />} />
                  <Route path="/help" element={<HelpPage />} />
                </Route>
              </Route>

              {/* Admin Protected Portal Routes */}
              <Route element={<AdminRoute />}>
                <Route element={<Layout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/admin/complaints"
                    element={<AdminComplaintsPage />}
                  />
                  <Route
                    path="/admin/complaints/:id"
                    element={<ComplaintDetailsPage />}
                  />
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                </Route>
              </Route>

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
