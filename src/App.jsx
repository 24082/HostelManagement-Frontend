import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Box } from "@mui/material";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/ComplaintForm";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* Navbar only for logged-in users */}
      {user && <Navbar />}

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          width: "100%",
          bgcolor: "background.default",
          pt: user ? 10 : 0,
        }}
      >
        <Routes>
          {/* Home route */}
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

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User route */}
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

          {/* Admin route */}
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
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
