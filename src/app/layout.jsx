import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppThemeProvider from "@/components/theme/AppThemeProvider";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { Header } from "@/components/header";
import AuthProvider from "@/utils/SessionProvider";
import LoginModal from "@/components/auth/LoginAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

export default function RootLayout({ children }) {
  const session = getServerSession(authOptions);

  return (
    <html lang="fr-FR" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppThemeProvider>
            <InitColorSchemeScript attribute="class" defaultMode="dark" />
            <AuthProvider>
              <AuthModalProvider>
                <Header session={session} />
                {children}
                <LoginModal />
              </AuthModalProvider>
            </AuthProvider>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
