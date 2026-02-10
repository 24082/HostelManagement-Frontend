import { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/complaints", form);
      alert("Complaint submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Try again.");
    }
  };

  return (
    <Box
      sx={{
        height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#eef2f6",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 550,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" mb={3}>
          🧾 Register a New Complaint
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Complaint Title"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ mb: 3 }}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category}
              label="Category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
          >
            Submit Complaint
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
