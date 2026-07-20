import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { JsonLd } from "@/components/JsonLd";
import { getProjects } from "@/lib/sanity";
import { categories, type Category } from "@/lib/projects";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

const label = (category: string) =>
  `${category.charAt(0).toUpperCase()}${category.slice(1)}`;

const categoryDescription = (category: string) =>
  `${label(category)} photography by Berlin-based photographer Elvira Nisman — selected ${category} projects, campaigns and shootings.`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!categories.includes(category as Category)) return {};
  return pageMetadata({
    title: label(category),
    description: categoryDescription(category),
    path: `/${category}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!categories.includes(category as Category)) notFound();

  const projects = await getProjects();
  const filtered = projects.filter((project) => project.category === category);

  if (filtered.length === 0) {
    return (
      <div className="main">
        <p className="empty">[ Coming soon ]</p>
      </div>
    );
  }

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/${category}#collection`,
    url: `${siteUrl}/${category}`,
    name: `${label(category)} — Elvira Nisman`,
    description: categoryDescription(category),
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#elvira-nisman` },
    hasPart: filtered.map((project) => ({
      "@type": "ImageObject",
      name: project.title,
      contentUrl: project.cover.src,
      url: `${siteUrl}/project/${project.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <CategoryArchive category={category} projects={filtered} />
    </>
  );
}
