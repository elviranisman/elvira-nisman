import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { JsonLd } from "@/components/JsonLd";
import { getProjects } from "@/lib/sanity";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const description =
    project.description ||
    `${project.title} — ${project.subtitle} by Berlin-based photographer Elvira Nisman.`;
  return pageMetadata({
    title: project.title,
    description,
    path: `/project/${project.slug}`,
    images: [
      {
        url: project.cover.src,
        width: project.cover.width,
        height: project.cover.height,
        alt: `${project.title} — ${project.subtitle}`,
      },
    ],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const galleryJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${siteUrl}/project/${project.slug}#gallery`,
    url: `${siteUrl}/project/${project.slug}`,
    name: `${project.title} — ${project.subtitle}`,
    description: project.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    author: { "@id": `${siteUrl}/#elvira-nisman` },
    ...(project.year ? { datePublished: project.year } : {}),
    image: project.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: image.src,
      width: image.width,
      height: image.height,
      creator: { "@id": `${siteUrl}/#elvira-nisman` },
    })),
  };

  return (
    <div className="projectPage">
      <JsonLd data={galleryJsonLd} />
      <header className="head">
        <div>
          <h1 className="title">{project.title}</h1>
          <p className="sub">{project.subtitle}</p>
        </div>
        <div className="meta">
          <p>
            {project.category}, {project.year}
          </p>
          <Link href={`/${project.category}`} className="back">
            Close
          </Link>
        </div>
      </header>
      <div className="images">
        {project.images.map((image, index) => (
          <div
            key={image.src}
            className={`pImage${image.width > image.height ? " -full" : ""}`}
          >
            <Image
              src={image.src}
              alt={`${project.title} — image ${index + 1}`}
              width={image.width}
              height={image.height}
              sizes={
                image.width > image.height
                  ? "100vw"
                  : "(min-width: 1025px) 60vw, 100vw"
              }
              priority={index < 2}
            />
          </div>
        ))}
      </div>
      <BackToTop />
    </div>
  );
}
