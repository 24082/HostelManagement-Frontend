import { useState, useEffect } from "react";
import API from "../utils/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a category name");
    try {
      await API.post("/categories", { name, description });
      setName("");
      setDescription("");
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding category");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await API.delete(`/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 600,
          width: "100%",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          align="center"
          mb={3}
        >
          🧩 Manage Complaint Categories
        </Typography>

        <form onSubmit={handleAdd}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Add Category
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" mb={1}>
          Existing Categories
        </Typography>

        <List>
          {categories.length === 0 && (
            <Typography color="text.secondary" fontSize="0.9rem">
              No categories added yet.
            </Typography>
          )}
          {categories.map((cat) => (
            <ListItem
              key={cat._id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDelete(cat._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              }
            >
              <ListItemText
                primary={cat.name}
                secondary={cat.description || "No description"}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
