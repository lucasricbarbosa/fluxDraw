import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster richColors />
      <Outlet />
    </ThemeProvider>
  );
}
