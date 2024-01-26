"use client";

import Loading from "../loading/loading";
import SnackbarProvider from "../snackbar/snackbar-provider";
import ThemeProvider from "../theme-provider/theme-provider";

export default function BodyProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Loading />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
}
