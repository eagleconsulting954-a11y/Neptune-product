import type { Metadata } from "next";
import "./globals.css";
import "./neptune-ui.css";
import "./production-console.css";

export const metadata: Metadata = {
  title: "Neptune — Vessel Command CRM",
  description: "Premium paywalled vessel command CRM for captains, heads of department, and maritime operations teams."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
