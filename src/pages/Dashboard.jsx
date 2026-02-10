import { useEffect, useState } from "react";
import API from "../utils/api";
import ComplaintCard from "../components/ComplaintCard";
import { Box, Typography, Paper } from "@mui/material";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/complaints/my");
        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints", err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.100",
        pt: 10,
        px: { xs: 2, sm: 3, md: 5 },
        pb: 8,
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="success.main"
          mb={6}
        >
          My Complaints
        </Typography>

        {complaints.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={8}>
            <Paper
              sx={{
                p: 6,
                maxWidth: 400,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <Typography variant="body1" mb={1}>
                No complaints found.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submit your first complaint to get started.
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
                lg: "1fr 1fr 1fr 1fr",
              },
              gap: 3,
              alignItems: "stretch", // ✅ ensures all cards stretch evenly
            }}
          >
            {complaints.map((c) => (
              <ComplaintCard key={c._id} data={c} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
