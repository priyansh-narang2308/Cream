import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const ubuntu = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400","700"],
});

export const metadata: Metadata = {
  title: "Beam",
  description: "A Chatting application using Stream for live video calling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className}`}>{children}</body>
    </html>
  );
}
