import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediShield",
  description: "MediShield - A dental supplies store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <NextAuthProvider>
          <Toaster />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
