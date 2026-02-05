import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

export default function ComplaintCard({ data }) {
  const statusColors = {
    Pending: "warning",
    "In Progress": "info",
    Resolved: "success",
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
        height: "100%", // ✅ Ensures equal height in grid
        transition: "0.3s",
        "&:hover": {
          boxShadow: 8,
          transform: "translateY(-5px)",
          bgcolor: "#e8f5e9",
          width: "100%",
          
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" noWrap>
            {data.title}
          </Typography>
          <Chip
            label={data.status}
            color={statusColors[data.status]}
            size="small"
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {data.description}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="0.85rem"
          color="text.secondary"
        >
          <span>🛠️ {data.category}</span>
          <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        </Box>
      </CardContent>
    </Card>
  );
}
