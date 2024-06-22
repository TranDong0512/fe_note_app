import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import BookIcon from "@mui/icons-material/Book";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import { Logout } from "../../service/userService";
import { useDispatch } from "react-redux";
function UserMenu() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("info");
    if (storedUser) {
      setData(JSON.parse(storedUser));
    }
  }, []);
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      const response = await dispatch(Logout());
      if (Logout.fulfilled.match(response)) {
        localStorage.removeItem("info");
        Cookies.remove("TokenUser");
        location.reload();
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ backgroundColor: "#576472" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <BookIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            NOTE APP
          </Typography>

          <Box sx={{ display: "flex" }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Typography fontSize={"1.1rem"} color={"aliceblue"}>
                Hi_{data?.userName || "No User"}{" "}
              </Typography>
            </IconButton>

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
              <MenuItem
                id="base_menu"
                onClick={handleCloseUserMenu}
                anchorEl={anchorElUser}
                open={open}
                onClose={handleCloseUserMenu}
              >
                <Typography textAlign="center" onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default UserMenu;
