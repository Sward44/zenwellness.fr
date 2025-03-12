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
import GoogleIcon from "@mui/icons-material/Google";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const { isOpen, closeModal } = useAuthModal();

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
    // closeModal() n'est pas nécessaire ici car Next-Auth gère la redirection
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
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{ textTransform: "none" }}
          >
            Se connecter avec Google
          </Button>
          <Typography align="center" color="text.secondary">
            ou
          </Typography>
          <form onSubmit={handleEmailLogin}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Adresse e-mail"
                name="email"
                type="email"
                required
                fullWidth
              />
              <TextField
                label="Mot de passe"
                name="password"
                type="password"
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth>
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
