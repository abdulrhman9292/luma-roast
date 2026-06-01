import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMA ROAST | Private Portfolio Demo",
  description:
    "A premium cinematic portfolio demo for the fictional global specialty coffee brand LUMA ROAST.",
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
