import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import AppThemeProvider from "@/components/theme/AppThemeProvider";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Header } from "@/components/header";
// import { getServerSession } from "next-auth";

export default function RootLayout({ children }) {
  // const session = getServerSession(authOptions);

  return (
    <html lang="fr-FR" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppThemeProvider>
            <InitColorSchemeScript attribute="class" defaultMode="dark" />
            <Header />
            {children}
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
