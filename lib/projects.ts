export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: "editorials" | "commercial" | "portrait" | "events";
  portraitType?: "artists" | "people";
  year: string;
  client: string;
  location: string;
  description: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

export const categories = ["editorials", "commercial", "portrait", "events"] as const;

export type Category = (typeof categories)[number];
