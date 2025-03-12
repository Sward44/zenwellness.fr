"use client";
import { useState, useEffect, useMemo, createContext } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
} from "@mui/material";

export const ThemeModeContext = createContext(null);

const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); // Valeur par défaut statique pour SSR

  // Synchroniser avec localStorage et prefers-color-scheme côté client uniquement
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialMode = savedMode || (prefersDark ? "dark" : "light");
    setMode(initialMode);
    document.documentElement.className = initialMode;
  }, []);

  const theme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        components: {
          MuiSvgIcon: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                width: "34px", // Taille par défaut
                height: "34px",
                color: "var(--mui-palette-primary-contrastText)", // Couleur par défaut
                padding: "0px",
                margin: "4px",
                [theme.breakpoints.down("sm")]: {
                  width: "24px", // Plus grand sur desktop
                  height: "24px",
                  padding: "0px",
                  margin: "4px",
                },
                [theme.breakpoints.down("md")]: {
                  width: "30px", // Plus grand sur desktop
                  height: "30px",
                  padding: "0px",
                  margin: "4px",
                },
              }),
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                width: "48px",
                height: "48px",
                padding: "4px",
                margin: "4px",
                [theme.breakpoints.down("sm")]: {
                  width: "40px",
                  height: "40px",
                  padding: "4px",
                  margin: "4px",
                },
                [theme.breakpoints.down("md")]: {
                  width: "44px",
                  height: "44px",
                  padding: "0px",
                  margin: "4px",
                },
              }),
            },
          },
        },
        cssVariables: {
          colorSchemeSelector: "class",
          disableCssColorScheme: true,
        },
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#376618", // Vert pour dark
                  dark: "#2C5114",
                  light: "#66B830",
                  contrastText: "#376618",
                },
                secondary: {
                  main: "#ffd600", // Jaune
                  dark: "#b29500",
                  light: "#ffde33",
                },
                background: {
                  default: "#FDFDEF", // Fond clair
                  paper: "#F8F7E4",
                },
              }
            : {
                primary: {
                  main: "#376618", // Vert pour dark
                  dark: "#2C5114",
                  light: "#66B830",
                  contrastText: "#66B830",
                },
                secondary: {
                  main: "#ffd600", // Jaune
                  dark: "#b29500",
                  light: "#ffde33",
                },
                background: {
                  default: "#121212", // Fond sombre
                  paper: "#1d1d1d",
                },
              }),
        },
      }),
    );
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default AppThemeProvider;
