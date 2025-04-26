import {Toaster} from "sonner"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider"
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mini-note",
  description: "Your notes, and nothing else.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.variable} suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="mini-note-theme-2"
          >
            <Toaster position="bottom-center"/>
            {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
