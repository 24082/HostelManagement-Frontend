import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Box } from "@mui/material";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/ComplaintForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategory from "./pages/AdminCategory"; // ✅ new page
import Navbar from "./components/Navbar";

function AppContent() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Pages without navbar (auth pages)
  const noNavbarRoutes = ["/login", "/register"];
  const noNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* Show Navbar only when logged in and not on login/register */}
      {user && !noNavbar && <Navbar />}

      <Box
        component="main"
        sx={{
          height: "100vh",
          width: "100%",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              user ? (
                user.role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Dashboard />
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Complaint Form */}
          <Route
            path="/new"
            element={
              user && user.role !== "admin" ? (
                <ComplaintForm />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              user && user.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* ✅ Admin Category Management Page */}
          <Route
            path="/admin/categories"
            element={
              user && user.role === "admin" ? (
                <AdminCategory />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
