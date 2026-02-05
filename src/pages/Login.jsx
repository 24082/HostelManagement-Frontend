import { useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert, Link } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "blue.100",
        p: 2,
      }}
    >
      <Box sx={{ maxWidth: 400, width: "100%", bgcolor: "white", p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" align="center" color="primary" fontWeight="bold" mb={3}>
          Hostel Complaint System
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don’t have an account?{" "}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
