import { ThemeProvider } from "next-themes";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { Header } from "@/components/header";
import AuthProvider from "@/utils/SessionProvider";
import LoginModal from "@/components/auth/LoginAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import "@/app/globals.css";

export default async function RootLayout({ children }) {
  const session = getServerSession(authOptions);

  return (
    <html lang="fr-FR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme">
          <AuthProvider>
            <AuthModalProvider>
              <Header session={session} />
              {children}
              <LoginModal />
            </AuthModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
