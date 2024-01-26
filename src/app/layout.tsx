import type { Metadata } from "next";

import "./globals.scss";
import { Providers } from "@/lib/redux/providers";
import BodyProviders from "@/components/body-providers/body-providers";

export const metadata: Metadata = {
  title: "nftrs_cts_management_system",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body>
          <BodyProviders>{children}</BodyProviders>
        </body>
      </html>
    </Providers>
  );
}
