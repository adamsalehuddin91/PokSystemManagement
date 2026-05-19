import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MessyMates — Boutique Play for Little Ones",
  description: "Sensory play, creative arts & birthday packages for children in Malaysia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
