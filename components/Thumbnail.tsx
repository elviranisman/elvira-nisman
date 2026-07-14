import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

export function Thumbnail({
  project,
  highlighted,
}: {
  project: Project;
  highlighted: boolean;
}) {
  const ratio = project.cover.width / project.cover.height;

  return (
    <div
      className={`thumbnail project${highlighted ? " -highlighted" : ""}`}
      style={{ "--ratio": ratio.toFixed(3) } as CSSProperties}
    >
      <div className="image">
        <Image
          src={project.cover.src}
          alt={`${project.title} — ${project.subtitle}`}
          width={project.cover.width}
          height={project.cover.height}
          sizes="(min-width: 1024px) 34vw, 55vw"
        />
      </div>
      <div className="info">
        <p className="title">{project.title}</p>
        <p className="meta">
          {project.subtitle} — {project.year}
        </p>
      </div>
    </div>
  );
}
