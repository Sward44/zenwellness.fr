import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppThemeProvider from "@/components/theme/AppThemeProvider";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { Header } from "@/components/header";
import { SessionProvider } from "next-auth/react";
// import { getServerSession } from "next-auth";

export default function RootLayout({ children }) {
  // const session = getServerSession(authOptions);

  return (
    <html lang="fr-FR" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppThemeProvider>
            <InitColorSchemeScript attribute="class" defaultMode="dark" />
            <SessionProvider>
              <AuthModalProvider>
                <Header />
                {children}
                <LoginModal />
              </AuthModalProvider>
            </SessionProvider>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
