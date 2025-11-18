import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MissingKeysDialog } from "@/components/missing-keys-dialog";
import { Analytics } from '@vercel/analytics/next';
import { AuthInitializer } from "@/components/auth/auth-initializer";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/posthog-provider";
import { logEnvironmentStatus } from "@/lib/env-validation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: {
    default: "History | Explore Historical Research",
    template: "%s | History",
  },
  description:
    "Interactive history research platform with 3D globe visualization. Click anywhere on Earth to explore comprehensive historical analysis powered by AI.",
  applicationName: "History",
  openGraph: {
    title: "History | Explore Historical Research",
    description:
      "Interactive history research platform with 3D globe visualization. Click anywhere on Earth to explore comprehensive historical analysis powered by AI.",
    url: "/",
    siteName: "History",
    images: [
      {
        url: "/valyu.png",
        width: 1200,
        height: 630,
        alt: "History | Explore Historical Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "History | Explore Historical Research",
    description:
      "Interactive history research platform with 3D globe visualization. Click anywhere on Earth to explore comprehensive historical analysis powered by AI.",
    images: ["/valyu.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Log environment status on server-side render
  if (typeof window === 'undefined') {
    logEnvironmentStatus();
  }
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthInitializer>
              <PostHogProvider>
                <MissingKeysDialog />
                {children}
                <Analytics />
              </PostHogProvider>
            </AuthInitializer>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}