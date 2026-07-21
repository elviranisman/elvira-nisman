import Image from "next/image";
import { getAboutContent, type ExhibitionEntry } from "@/lib/sanity";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Elvira Nisman is a Berlin-based photographer and visual storyteller working across portrait, fashion and film — commercial campaigns, artist shootings and personal projects.",
  path: "/about",
});

function AccentPart({ text, url }: { text: string; url?: string }) {
  if (!url) return <span className="entryMark">{text}</span>;
  return (
    <a className="entryLink" href={url} target="_blank" rel="noreferrer">
      {text}
    </a>
  );
}

function ExhibitionLine({ entry }: { entry: ExhibitionEntry }) {
  const { title, highlight, url } = entry;
  const index = highlight
    ? title.toLowerCase().indexOf(highlight.toLowerCase())
    : -1;

  if (index === -1) {
    return url ? <AccentPart text={title} url={url} /> : <>{title}</>;
  }

  return (
    <>
      {title.slice(0, index)}
      <AccentPart text={title.slice(index, index + highlight!.length)} url={url} />
      {title.slice(index + highlight!.length)}
    </>
  );
}

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
                    <ExhibitionLine entry={entry} />
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
