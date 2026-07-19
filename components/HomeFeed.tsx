import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { FeedEntry, FeedModule } from "@/lib/homeFeed";

function Media({
  entry,
  sizes,
  priority,
}: {
  entry: FeedEntry;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="media">
      <Link href={`/project/${entry.project.slug}`}>
        <Image
          src={entry.image.src}
          alt={`${entry.project.title} — ${entry.project.subtitle}`}
          width={entry.image.width}
          height={entry.image.height}
          sizes={sizes}
          priority={priority}
        />
      </Link>
    </div>
  );
}

function Caption({ entry }: { entry: FeedEntry }) {
  return (
    <div className="caption">
      <h2 className="title">
        {entry.project.title}
        {"\n"}
        {entry.project.subtitle}
      </h2>
      <p className="meta">
        {entry.project.category}, {entry.project.year}
      </p>
    </div>
  );
}

function Module({ module, index }: { module: FeedModule; index: number }) {
  switch (module.type) {
    case "hero":
      return (
        <div className="module -hero">
          <Media entry={module.entry} sizes="100vw" priority={index === 0} />
          <Caption entry={module.entry} />
        </div>
      );
    case "single":
      return (
        <div className="module -single">
          <Media entry={module.entry} sizes="(min-width: 769px) 66vw, 100vw" />
          <Caption entry={module.entry} />
        </div>
      );
    case "wide":
      return (
        <div className="module -wide">
          <Media entry={module.entry} sizes="100vw" />
          <Caption entry={module.entry} />
        </div>
      );
    case "duo": {
      const firstRatio = module.first.image.width / module.first.image.height;
      const secondRatio = module.second.image.width / module.second.image.height;
      return (
        <div
          className="module -duo"
          style={
            {
              "--duo-cols": `${firstRatio.toFixed(4)}fr ${secondRatio.toFixed(4)}fr`,
            } as CSSProperties
          }
        >
          <Media entry={module.first} sizes="(min-width: 769px) 50vw, 100vw" />
          <Caption entry={module.first} />
          <Media entry={module.second} sizes="(min-width: 769px) 50vw, 100vw" />
          <Caption entry={module.second} />
        </div>
      );
    }
    case "quote":
      return (
        <div className="module -quote">
          <p className="quoteText">{module.quote}</p>
          <Media entry={module.entry} sizes="(min-width: 769px) 42vw, 100vw" />
          <Caption entry={module.entry} />
        </div>
      );
  }
}

export function HomeFeed({ modules }: { modules: FeedModule[] }) {
  if (modules.length === 0) {
    return (
      <div className="main">
        <p className="empty">[ Coming soon ]</p>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="feed">
        {modules.map((module, index) => (
          <Module
            key={`${module.type}-${index}`}
            module={module}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
