import type { Metadata } from "next";
import { Montserrat, Notable } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AppHeader, type MenuPreview } from "@/components/AppHeader";
import { getProjects, getSocialContent } from "@/lib/sanity";
import { categories } from "@/lib/projects";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await getProjects();
  const previews: Record<string, MenuPreview> = {};
  for (const category of categories) {
    const project = projects.find((p) => p.category === category);
    if (project) {
      previews[`/${category}`] = {
        type: "image",
        src: project.cover.src,
        width: project.cover.width,
        height: project.cover.height,
      };
    }
  }
  const social = await getSocialContent();
  const reel =
    social.reels.find((r) => /juicy/i.test(r.title)) ?? social.reels[0];
  if (reel) {
    previews["/social-media"] = { type: "video", src: reel.src };
  }

  return (
    <html lang="en" className={`${montserrat.variable} ${notable.variable}`}>
      <body>
        <SmoothScroll>
          <AppHeader previews={previews} />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
