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
        boxShadow: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)",
          bgcolor: "#f5fdf7",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" noWrap sx={{ maxWidth: "70%" }}>
            {data.title}
          </Typography>
          <Chip
            label={data.status}
            color={statusColors[data.status] || "default"}
            size="small"
          />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          sx={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.description}
        </Typography>

        {/* Footer */}
        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="0.85rem"
          color="text.secondary"
          mt="auto"
        >
          <span>🛠️ {data.category?.name || "N/A"}</span>
          <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        </Box>
      </CardContent>
    </Card>
  );
}
