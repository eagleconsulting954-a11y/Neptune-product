import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neptune — Maritime Intelligence Platform",
  description: "Login-gated maritime CRM, subscriptions, website traffic analytics, and fleet operations intelligence."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
