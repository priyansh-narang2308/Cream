import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { Toaster } from "sonner";

const ubuntu = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
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
      <body className={`${ubuntu.className}`}>
        <ClerkProvider
          signInFallbackRedirectUrl={"/dashboard"}
          signUpFallbackRedirectUrl={"/dashboard"}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
