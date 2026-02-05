import { useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/register", form);
    login(res.data);
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "grey.100", p: 2 }}>
      <Box sx={{ maxWidth: 400, width: "100%", bgcolor: "white", p: 4, borderRadius: 3, boxShadow: 4 }}>
        <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            required
            sx={{ mb: 2 }}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Email"
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
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" mt={2}>
          Already registered? <Link component={RouterLink} to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}
