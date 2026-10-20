import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { Suspense } from "react";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { NativeBackButton } from "@/components/providers/NativeBackButton";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Wishlet — Send an experience",
    template: "%s | Wishlet",
  },
  description:
    "Create beautiful, personalized, animated web pages for special occasions. Ready in seconds, remembered forever.",
  keywords: ["wishlet", "birthday wish", "anniversary", "personalized greeting", "digital card"],
  openGraph: {
    siteName: "Wishlet",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4F46E5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${manrope.variable} ${playfairDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
        <NativeBackButton />
      </body>
    </html>
  );
}
