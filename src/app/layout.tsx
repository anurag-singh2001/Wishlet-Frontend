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
import { AppIntro } from "@/components/providers/AppIntro";
import { NativeHomeRedirect } from "@/components/providers/NativeHomeRedirect";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { getServerBranding } from "@/features/site-config/lib/server";
import { FestivalProvider } from "@/features/festivals/components/FestivalProvider";
import { FestivalStatusBar } from "@/features/festivals/components/FestivalStatusBar";
import { getServerFestival } from "@/features/festivals/lib/server";
import { festivalStyle, previewScript } from "@/features/festivals/lib/theme";
import { themeVars } from "@/features/site-config/lib/theme";

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

export async function generateMetadata(): Promise<Metadata> {
  const [{ faviconUrl, appName }, festival] = await Promise.all([
    getServerBranding(),
    getServerFestival(),
  ]);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    title: {
      default: `${appName} — Send an experience`,
      template: `%s | ${appName}`,
    },
    description:
      "Create beautiful, personalized, animated web pages for special occasions. Ready in seconds, remembered forever.",
    keywords: ["wishlet", "birthday wish", "anniversary", "personalized greeting", "digital card"],
    openGraph: {
      siteName: appName,
      type: "website",
    },
    icons: {
      icon: festival?.favicon ?? (faviconUrl || "/icon.svg"),
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const festival = await getServerFestival();
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: festival?.colors.statusBar ?? "#4F46E5",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactElement> {
  const [branding, festival] = await Promise.all([getServerBranding(), getServerFestival()]);
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${manrope.variable} ${playfairDisplay.variable} h-full antialiased`}
      style={{ ...themeVars(branding), ...festivalStyle(festival) }}
      suppressHydrationWarning
    >
      <head>
        {/* ?festival=<id> preview only; the live festival is themed on the server above. */}
        <script dangerouslySetInnerHTML={{ __html: previewScript() }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <FestivalProvider festivalId={festival?.id ?? null}>
          <QueryProvider>
            <ToastProvider>
              <AuthProvider>{children}</AuthProvider>
            </ToastProvider>
          </QueryProvider>
          <FestivalStatusBar />
        </FestivalProvider>
        <NativeBackButton />
        <AppIntro />
        <NativeHomeRedirect />
      </body>
    </html>
  );
}
