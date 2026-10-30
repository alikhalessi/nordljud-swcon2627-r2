import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Nordljud — Swedish through English", description: "Source-linked Swedish learning for A2, B1, B2 and C1." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
