import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryArchive } from "@/components/CategoryArchive";
import { getProjects } from "@/lib/sanity";
import { categories, type Category } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase()}${category.slice(1)} — Elvira Nisman`,
    description: `${category} photography by Elvira Nisman, Berlin.`,
  };
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

  return <CategoryArchive category={category} projects={filtered} />;
}
