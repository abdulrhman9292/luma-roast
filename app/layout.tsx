import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMA ROAST | A slower way to arrive",
  description:
    "A cinematic specialty coffee website for LUMA ROAST, shaped around ritual, signature coffees, and slow moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
