import type { Metadata } from "next";
import { Montserrat, Notable } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AppHeader } from "@/components/AppHeader";
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
  title: "Elvira Nisman",
  description:
    "Elvira Nisman is a Berlin-based photographer focusing on fashion editorials, campaigns and intimate personal stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${notable.variable}`}>
      <body>
        <SmoothScroll>
          <AppHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
