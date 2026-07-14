"use client";

import { useSearchParams } from "next/navigation";
import { categories, projects, type Category } from "@/lib/projects";
import { HomeGrid } from "./HomeGrid";

export function FilteredHomeGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filtered = categories.includes(category as Category)
    ? projects.filter((project) => project.category === category)
    : projects;

  return <HomeGrid projects={filtered} />;
}
