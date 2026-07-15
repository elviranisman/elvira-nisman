"use client";

import { useSearchParams } from "next/navigation";
import { categories, projects, type Category } from "@/lib/projects";
import { HomeFeed } from "./HomeFeed";

export function FilteredHomeFeed() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filtered = categories.includes(category as Category)
    ? projects.filter((project) => project.category === category)
    : projects;

  return <HomeFeed projects={filtered} />;
}
