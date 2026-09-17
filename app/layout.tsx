import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Briefly — Your Daily Brief",
  description: "A personalized AI-generated daily newsletter prototype.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans antialiased">{children}</body>
    </html>
  );
}
