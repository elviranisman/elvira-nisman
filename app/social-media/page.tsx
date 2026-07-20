import type { Metadata } from "next";
import { getSocialContent } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Social media — Elvira Nisman",
  description:
    "Content creation for social media — brand strategy and content creation by Elvira Nisman, Berlin.",
};

export default async function SocialMediaPage() {
  const content = await getSocialContent();

  return (
    <div className="socialPage">
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 className="pageTitle">{content.title}</h1>
      <div className="services">
        {content.services.map((service) => (
          <section key={service.name} className="service">
            <p className="num">{service.number}</p>
            <div className="body">
              <h2 className="name">{service.name}</h2>
              <p className="text">{service.text}</p>
              <a
                className="book"
                href={content.calendlyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Book service
              </a>
            </div>
          </section>
        ))}
      </div>
      {content.reels.length > 0 && (
      <div className="reels">
        <p className="label">Selected content</p>
        <ul className="grid">
          {content.reels.map((reel) => (
            <li key={reel.src} className="reel">
              <a href={reel.href} target="_blank" rel="noreferrer">
                <video
                  className="video"
                  src={reel.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <p className="kind">{reel.kind}</p>
                <p className="name">{reel.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      )}
      <div className="feedback">
        <p className="label">Feedback</p>
        <ul className="quotes">
          {content.feedback.map((entry) => (
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
      <div className="collab">
        <p className="label">{content.collabLabel}</p>
        <h2 className="title">{content.collabTitle}</h2>
        <p className="text">{content.collabText}</p>
        <a
          className="cta"
          href={content.calendlyUrl}
          target="_blank"
          rel="noreferrer"
        >
          {content.ctaLabel}
        </a>
      </div>
    </div>
  );
}
