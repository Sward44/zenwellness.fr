"use client";
import { useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Zenwellness } from "@/components/logos/Logos";
import { useContext } from "react";
import { ThemeModeContext } from "@/components/theme/AppThemeProvider";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { mode, setMode } = useContext(ThemeModeContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleTheme = useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  }, [mode, setMode]);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "var(--mui-palette-background-paper)", // Forcer l'utilisation de primary.main
        transitionProperty: "transform",
        transitionDuration: "300ms",
        transform: visible ? "translateY(0%)" : "translateY(-100%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <Tooltip title="Zenwellness site web">
              <Zenwellness
                sx={{
                  width: {
                    xs: 107.5,
                    sm: 107.5,
                    md: 134.4,
                  },
                  height: { xs: 32, sm: 32, md: 40 },
                }}
              />
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title="Switch thème">
              <IconButton
                size="large"
                edge="start"
                aria-label="toggle theme"
                sx={{
                  color: "var(--mui-palette-primary-contrastText)",
                }}
                onClick={toggleTheme}
              >
                {mode === "light" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Ouvrir paramètres">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleOutlinedIcon sx={{}} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <IconButton size="large" edge="start" aria-label="menu" sx={{}}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
