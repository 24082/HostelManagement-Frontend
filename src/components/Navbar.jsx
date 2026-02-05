import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hostel Complaint System
        </Typography>

        {/* Desktop navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {user?.role === "admin" ? (
            <Button color="inherit" component={RouterLink} to="/admin">
              Admin Dashboard
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/new">
                New Complaint
              </Button>
            </>
          )}
          <Button
            color="error"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        {/* Mobile menu icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile dropdown menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {user?.role === "admin" ? (
            <MenuItem
              component={RouterLink}
              to="/admin"
              onClick={handleMenuClose}
            >
              Admin Dashboard
            </MenuItem>
          ) : (
            <>
              <MenuItem
                component={RouterLink}
                to="/"
                onClick={handleMenuClose}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={RouterLink}
                to="/new"
                onClick={handleMenuClose}
              >
                New Complaint
              </MenuItem>
            </>
          )}
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
