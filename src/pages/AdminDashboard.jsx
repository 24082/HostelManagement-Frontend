import { useEffect, useState } from "react";
import API from "../utils/api";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, { status });
      fetchComplaints();
    } catch (err) {
      console.error("Error updating complaint:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints =
    filter === "all" ? complaints : complaints.filter((c) => c.status === filter);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">
            🧾 All Complaints
          </Typography>

          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={filter}
              label="Status Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell sx={{ color: "white" }}>Title</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Category</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredComplaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No complaints found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredComplaints.map((c) => (
                  <TableRow key={c._id} hover>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={c.status}
                        color={
                          c.status === "Resolved"
                            ? "success"
                            : c.status === "In Progress"
                            ? "warning"
                            : "error"
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ mr: 1 }}
                        onClick={() => handleStatus(c._id, "In Progress")}
                      >
                        In Progress
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleStatus(c._id, "Resolved")}
                      >
                        Resolved
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
