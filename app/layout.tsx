import type { Metadata } from "next";
import { Montserrat, Notable } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AppHeader } from "@/components/AppHeader";
import { JsonLd } from "@/components/JsonLd";
import {
  keywords,
  personJsonLd,
  siteDescription,
  siteName,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const notable = Notable({
  variable: "--font-notable",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elvira Nisman — Berlin Photographer",
    template: "%s — Elvira Nisman",
  },
  description: siteDescription,
  keywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Elvira Nisman — Berlin Photographer",
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Elvira Nisman — Berlin-based photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvira Nisman — Berlin Photographer",
    description: siteDescription,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${notable.variable}`}>
      <body>
        <JsonLd data={[websiteJsonLd, personJsonLd]} />
        <SmoothScroll>
          <AppHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
