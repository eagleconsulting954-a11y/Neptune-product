import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neptune — Vessel Command CRM",
  description: "A premium login-gated CRM and command dashboard for captains, heads of department, and maritime operations teams."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
