import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Elvira Nisman",
  description:
    "Elvira Nisman is a Berlin-based photographer and visual storyteller working across portrait, fashion, and film.",
};

export default function AboutPage() {
  return (
    <div className="aboutPage">
      <h1 className="pageTitle">About</h1>
      <div className="intro">
        <div className="portrait">
          <Image
            src="/23-59-a-fashion-story/portrait_berlin_fotograf_mode.jpg"
            alt="Elvira Nisman"
            width={1200}
            height={1780}
            sizes="(min-width: 769px) 33vw, 100vw"
            priority
          />
        </div>
        <div className="bio">
          <p>
            Elvira Nisman is a Berlin-based photographer and visual storyteller
            working across portrait, fashion, and film. Born in 1989 in
            Moldova, she moves fluidly between commercial and artistic practice
            — campaigns and lookbooks for fashion and lifestyle brands
            alongside shootings with artists and culturally influential
            personalities, as well as independent projects shown in exhibitions
            and at renowned art fairs.
          </p>
          <p>
            Her visual language sits at the intersection of strength and
            fragility, presence and absence, the tension between a person and
            the world around them. The result is imagery that feels intimate
            rather than staged; clean and minimal on the surface, with a
            poetic, sometimes bittersweet undertone underneath.
          </p>
        </div>
      </div>
      <div className="prints">
        <h2 className="printsTitle">Take a piece of the story home</h2>
        <p className="printsText">
          Limited edition prints, each one a moment caught between honesty and
          beauty.
        </p>
      </div>
    </div>
  );
}
