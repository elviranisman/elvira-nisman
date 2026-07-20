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
        {content.portrait && (
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
        )}
        <div className="bio">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
      {content.exhibitions.length > 0 && (
        <div className="exhibitions">
          <p className="label">Selected exhibitions</p>
          {content.exhibitions.map((group) => (
            <section key={group.year} className="yearGroup">
              <h2 className="year">{group.year}</h2>
              <ul className="entries">
                {group.entries.map((entry) => (
                  <li key={entry.title}>
                    {entry.url ? (
                      <a
                        className="entryLink"
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {entry.title}
                      </a>
                    ) : (
                      entry.title
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      {content.testimonials.length > 0 && (
        <div className="testimonials">
          <p className="label">Testimonials</p>
          <ul className="quotes">
            {content.testimonials.map((entry) => (
              <li key={entry.client} className="entry">
                <p className="stars">★★★★★</p>
                <blockquote className="quote">{entry.quote}</blockquote>
                <p className="client">
                  {entry.client}
                  <span className="role"> — Google review</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="prints">
        <h2 className="printsTitle">{content.printsTitle}</h2>
        <p className="printsText">{content.printsText}</p>
      </div>
    </div>
  );
}
