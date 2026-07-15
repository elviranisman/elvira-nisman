import type { Project, ProjectImage } from "./projects";

export type FeedEntry = {
  project: Project;
  image: ProjectImage;
};

export type FeedModule =
  | { type: "hero"; entry: FeedEntry }
  | { type: "single"; entry: FeedEntry }
  | { type: "wide"; entry: FeedEntry }
  | { type: "quote"; entry: FeedEntry; quote: string }
  | { type: "duo"; first: FeedEntry; second: FeedEntry };

function picksFor(project: Project): FeedEntry[] {
  const picked = [project.cover];
  const middle = project.images[Math.floor(project.images.length / 2)];
  const late = project.images[project.images.length - 2];
  const landscape = project.images.find(isLandscape);
  [middle, late, landscape].forEach((image) => {
    if (image && !picked.some((existing) => existing.src === image.src)) {
      picked.push(image);
    }
  });
  return picked.map((image) => ({ project, image }));
}

function isLandscape(image: ProjectImage) {
  return image.width > image.height;
}

function firstSentence(text: string) {
  const end = text.indexOf(".");
  return end === -1 ? text : text.slice(0, end + 1);
}

const pattern = ["single", "duo", "quote", "single", "duo", "wide"] as const;

function takeLandscape(entries: FeedEntry[], from: number): FeedEntry | undefined {
  const found = entries.findIndex(
    (entry, position) => position >= from && isLandscape(entry.image)
  );
  if (found === -1) return undefined;
  return entries.splice(found, 1)[0];
}

export function buildFeed(projects: Project[]): FeedModule[] {
  const entries = projects.flatMap(picksFor);
  const modules: FeedModule[] = [];
  let index = 0;
  let step = 0;

  while (index < entries.length) {
    if (modules.length === 0) {
      const landscape = takeLandscape(entries, index);
      modules.push({ type: "hero", entry: landscape ?? entries[index] });
      if (!landscape) index += 1;
      continue;
    }
    const kind = pattern[step % pattern.length];
    step += 1;
    if (kind === "duo" && index + 1 < entries.length) {
      modules.push({ type: "duo", first: entries[index], second: entries[index + 1] });
      index += 2;
    } else if (kind === "quote") {
      modules.push({
        type: "quote",
        entry: entries[index],
        quote: firstSentence(entries[index].project.description),
      });
      index += 1;
    } else if (kind === "wide") {
      const landscape = takeLandscape(entries, index);
      if (landscape) {
        modules.push({ type: "wide", entry: landscape });
      } else {
        modules.push({ type: "single", entry: entries[index] });
        index += 1;
      }
    } else {
      modules.push({ type: "single", entry: entries[index] });
      index += 1;
    }
  }

  return modules;
}
