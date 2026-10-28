import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nordljud | Learn Swedish in small steps",
  description: "Short Swedish learning exercises for A2, B1, B2 and C1."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
