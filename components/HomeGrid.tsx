import type { Project } from "@/lib/projects";
import { Thumbnail } from "./Thumbnail";

const variations = [
  "-variation-highlighted-right",
  "-variation-highlighted-centered",
  "-variation-highlighted-left",
];

const highlightPosition = [2, 1, 0];

function chunkIntoRows(items: Project[]) {
  const rows: Project[][] = [];
  for (let i = 0; i < items.length; i += 3) {
    rows.push(items.slice(i, i + 3));
  }
  return rows;
}

export function HomeGrid({ projects }: { projects: Project[] }) {
  const rows = chunkIntoRows(projects);

  if (rows.length === 0) {
    return (
      <div className="main">
        <p className="empty">[ Coming soon ]</p>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="grid">
        {rows.map((row, rowIndex) => {
          const variation = rowIndex % variations.length;
          const highlight = Math.min(highlightPosition[variation], row.length - 1);
          return (
            <div key={rowIndex} className={`item ${variations[variation]}`}>
              {row.map((project, projectIndex) => (
                <Thumbnail
                  key={project.slug}
                  project={project}
                  highlighted={projectIndex === highlight}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
