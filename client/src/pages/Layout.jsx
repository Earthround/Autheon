import { Outlet, Link } from "react-router-dom";
import jorund from "../images/Jorundpfp.jpg";

import { styled, alpha, useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../theme";
import { SvgIcon } from "@mui/material";
import { ReactComponent as Quill } from "../images/QuillVector.svg";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
//import AdbIcon from '@mui/icons-material/Adb';

import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const pages = ["Home", "Discover", "Contact"];
const settings = ["Profile", "Library", "Settings"];

/*     return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}; */

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAvatar = async () => {
    try {
      const imageRef = ref(storage, "usersAvatar/" + user.uid + "/userAvatar");
      getDownloadURL(imageRef).then((url) => {
        setUrl(url);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    fetchUserName();
    fetchAvatar();
  }, [user, loading]);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.purple, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.purple, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "40ch",
        "&:focus": {
          width: "48ch",
        },
      },
    },
  }));

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar sx={{ color: "#420F60", justifyContent: "space-between" }}>
              <Stack direction="row" alignItems="center">
                <SvgIcon>
                  <Quill />
                </SvgIcon>

                <Typography
                  variant="h6"
                  noWrap
                  component={Link}
                  to={"/"}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    letterSpacing: ".0rem",
                    textDecoration: "none",
                  }}
                >
                  Autheon
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem
                        key={page}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        to={page}
                      >
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  to={"/"}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "Montserrat",
                    fontWeight: 700,
                    letterSpacing: ".0rem",
                    textDecoration: "none",
                  }}
                >
                  Autheon
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={page}
                      sx={{ my: 2, color: "#420F60", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              </Stack>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "#420F60" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Find an author…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color=" inherit"
                  component={Link}
                  to={"/fanmail"}
                >
                  <Badge badgeContent={0} color="error" sx={{}}>
                    <MailIcon sx={{ fontSize: 32 }} />
                  </Badge>
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Profile settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={url} sx={{ width: 58, height: 58 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "60px" }}
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      to={setting}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <Typography textAlign="center" onClick={handleLogout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Outlet />
      </ThemeProvider>
    </>
  );
};

export default Layout;
