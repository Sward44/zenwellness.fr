"use client";
import { useState, useEffect, useCallback, useContext } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Zenwellness } from "@/components/logos/Logos";
import { ThemeModeContext } from "@/components/theme/AppThemeProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { signOut } from "next-auth/react";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header({ session }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { mode, setMode } = useContext(ThemeModeContext);
  const { openModal } = useAuthModal();

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

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "var(--mui-palette-background-paper)",
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
            {!session ? (
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
            ) : (
              <Tooltip title="Se connecter">
                <IconButton sx={{ p: 0 }} onClick={openModal}>
                  <ExitToAppOutlinedIcon />
                </IconButton>
              </Tooltip>
            )}
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
