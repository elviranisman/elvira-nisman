import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/BackToTop";
import { getProjects } from "@/lib/sanity";

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
  return {
    title: `${project.title} — Elvira Nisman`,
    description: project.description,
  };
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

  return (
    <div className="projectPage">
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
