import { Container } from "@mui/material";

export default function Connexion() {
  return (
    <Container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2000,
        height: "100vh",
        width: "100%",
        opacity: "90%",
        bgcolor: "var(--mui-palette-background-paper)",
      }}
    ></Container>
  );
}
