import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "universal-cookie";
import { AppContext } from "../App";

const Header = () => {
  const cookies = new Cookies();
  const { areToken, setAreToken, admin } = useContext(AppContext);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Get the current location pathname
  const isAdminLocation = window.location.pathname === "/admin";

  // Menu handlers
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Logout handler function, destroys cookies and redirects to login page
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("UserId", { path: "/" });
    cookies.remove("Admin", { path: "/" });

    setAreToken(false);

    navigate("/auth/login");
  };

  return (
    <AppBar position="static">
      <Box display="flex" m="10px" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h5"
              fontWeight="bold"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {"MERN STACK: TASK MANAGER"}
            </Typography>
          </Box>
        </Link>

        {areToken ? (
          admin ? (
            <>
              <Box display={{ xs: "none", md: "flex" }} gap="1rem">
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  startIcon={
                    isAdminLocation ? <HomeIcon /> : <AdminPanelSettingsIcon />
                  }
                  onClick={() =>
                    isAdminLocation ? navigate("/") : navigate("/admin")
                  }
                >
                  {isAdminLocation ? "Home" : "Admin"}
                </Button>

                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Box>

              <Box display={{ xs: "flex", md: "none" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreVertOutlinedIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Box display={{ xs: "none", md: "flex" }}>
                <Button
                  size="small"
                  color="secondary"
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={logout}
                >
                  Logout
                </Button>
              </Box>

              <Box display={{ xs: "flex", md: "none" }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MoreVertOutlinedIcon />
                </IconButton>
              </Box>
            </>
          )
        ) : undefined}
      </Box>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {admin && (
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              isAdminLocation ? navigate("/") : navigate("/admin");
            }}
          >
            <ListItemIcon>
              {isAdminLocation ? <HomeIcon /> : <AdminPanelSettingsIcon />}
            </ListItemIcon>

            <ListItemText>
              <Typography>{isAdminLocation ? "Home" : "Admin"}</Typography>
            </ListItemText>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText>
            <Typography>Logout</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
