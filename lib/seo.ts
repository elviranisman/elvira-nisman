import type { Metadata } from "next";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elviranisman.com"
).replace(/\/$/, "");

export const siteName = "Elvira Nisman";

export const siteDescription =
  "Elvira Nisman is a Berlin-based photographer and visual storyteller working across portrait, fashion and film — editorials, campaigns, artist shootings and personal projects.";

export const socialLinks = [
  "https://www.instagram.com/elvira.nisman",
  "https://www.linkedin.com/in/elviranisman/",
];

export const keywords = [
  "Elvira Nisman",
  "Berlin photographer",
  "fashion photographer Berlin",
  "portrait photographer Berlin",
  "editorial photography",
  "campaign photography",
  "content creation Berlin",
  "Fotografin Berlin",
  "photographer and director",
];

const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Elvira Nisman — Berlin-based photographer",
};

type PageMetaInput = {
  title?: string;
  description?: string;
  path: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  images,
  noIndex,
}: PageMetaInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const resolvedDescription = description ?? siteDescription;
  const ogTitle = title ? `${title} — ${siteName}` : siteName;

  return {
    title,
    description: resolvedDescription,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      url: canonical,
      title: ogTitle,
      description: resolvedDescription,
      siteName,
      locale: "en_US",
      images: images ?? [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: resolvedDescription,
      images: (images ?? [ogImage]).map((image) => image.url),
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#elvira-nisman`,
  name: "Elvira Nisman",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  jobTitle: "Photographer",
  description: siteDescription,
  nationality: "Moldovan",
  worksFor: {
    "@type": "Organization",
    name: "Elvira Nisman Photography",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Photography",
    "Fashion photography",
    "Portrait photography",
    "Editorial photography",
    "Content creation",
  ],
  sameAs: socialLinks,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  description: siteDescription,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#elvira-nisman` },
};
