import type { Metadata } from "next";
import Image from "next/image";
import { getAboutContent } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About — Elvira Nisman",
  description:
    "Elvira Nisman is a Berlin-based photographer and visual storyteller working across portrait, fashion, and film.",
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <div className="aboutPage">
      <h1 className="pageTitle">About</h1>
      <div className="intro">
        <div className="portrait">
          <Image
            src={content.portrait.src}
            alt="Elvira Nisman"
            width={content.portrait.width}
            height={content.portrait.height}
            sizes="(min-width: 769px) 33vw, 100vw"
            priority
          />
        </div>
        <div className="bio">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="prints">
        <h2 className="printsTitle">{content.printsTitle}</h2>
        <p className="printsText">{content.printsText}</p>
      </div>
    </div>
  );
}
