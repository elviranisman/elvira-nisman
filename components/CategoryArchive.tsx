"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Project } from "@/lib/projects";

const portraitFilters = ["all", "artists", "actors", "models", "business"] as const;

type PortraitFilter = (typeof portraitFilters)[number];

export function CategoryArchive({
  category,
  projects,
}: {
  category: string;
  projects: Project[];
}) {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [portraitFilter, setPortraitFilter] = useState<PortraitFilter>("all");
  const openRef = useRef<Project | null>(null);
  const lenis = useLenis();

  const isPortrait = category === "portrait";
  const visible =
    isPortrait && portraitFilter !== "all"
      ? projects.filter((project) => project.portraitType === portraitFilter)
      : projects;

  const open = (project: Project) => {
    setOpenProject(project);
    openRef.current = project;
    lenis?.stop();
  };

  const close = () => {
    setOpenProject(null);
    openRef.current = null;
    lenis?.start();
  };

  useMountEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openRef.current) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      <div className="categoryPage">
        <h1 className="pageTitle">
          {category}
          <span className="count">
            ({String(visible.length).padStart(2, "0")})
          </span>
        </h1>
        {isPortrait && (
          <div className="filters">
            {portraitFilters.map((filter) => (
              <button
                key={filter}
                className={`filter${portraitFilter === filter ? " -active" : ""}`}
                onClick={() => setPortraitFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>
      {visible.length === 0 && <p className="filterEmpty">[ Coming soon ]</p>}
      <div className="feed -category">
        {visible.map((project, index) => (
          <button
            key={project.slug}
            className="module -single"
            onClick={() => open(project)}
          >
            <div className="media">
              <Image
                src={project.cover.src}
                alt={`${project.title} — ${project.subtitle}`}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 769px) 66vw, 100vw"
                priority={index === 0}
              />
            </div>
            <div className="caption">
              <h2 className="title">
                {project.title}
                {"\n"}
                {project.subtitle}
              </h2>
              <p className="meta">
                {project.year} — {project.images.length} images
              </p>
            </div>
          </button>
        ))}
      </div>
      {openProject && (
        <div className="projectModal" role="dialog" aria-modal="true">
          <header className="head">
            <p className="title">
              {openProject.title}
              <span className="sub">{openProject.subtitle}</span>
            </p>
            <button className="close" onClick={close}>
              Close
            </button>
          </header>
          <div className="scroll" data-lenis-prevent>
            {openProject.images.map((image, index) => (
              <div
                key={image.src}
                className={`modalImage${image.width > image.height ? " -full" : ""}`}
              >
                <Image
                  src={image.src}
                  alt={`${openProject.title} — image ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  sizes={image.width > image.height ? "100vw" : "(min-width: 1025px) 60vw, 100vw"}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
