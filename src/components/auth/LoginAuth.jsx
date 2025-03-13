"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { Google, ZenwellnessFavicon } from "@/components/logos/Logos";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const { isOpen, closeModal } = useAuthModal();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      console.error("Erreur de connexion:", result.error);
    } else {
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="xs" fullWidth>
      <DialogTitle>Connexion</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <form onSubmit={handleEmailLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                required
                fullWidth
                color="var(--mui-palette-primary-contrastText)"
              />
              <TextField
                label="Mot de passe"
                name="password"
                type="password"
                fullWidth
                color="var(--mui-palette-primary-contrastText)"
              />
              <Button
                type="submit"
                startIcon={
                  <ZenwellnessFavicon
                    sx={{
                      width: { xs: 20 },
                      height: { xs: 20 },
                    }}
                  />
                }
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  bgcolor: "var(--mui-palette-grey-100)",
                  color: "var(--mui-palette-grey-900)",
                }}
              >
                Se connecter
              </Button>

              <Typography align="center">ou</Typography>
              <Button
                variant="contained"
                startIcon={
                  <Google
                    sx={{
                      width: { xs: 20 },
                      height: { xs: 20 },
                    }}
                  />
                }
                onClick={handleGoogleLogin}
                sx={{
                  textTransform: "none",
                  bgcolor: "var(--mui-palette-grey-100)",
                  color: "var(--mui-palette-grey-900)",
                }}
              >
                Se connecter
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}
