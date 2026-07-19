import { createClient } from "@sanity/client";
import { projects as fallbackProjects, type Project, type ProjectImage } from "./projects";
import { buildFeed, type FeedModule } from "./homeFeed";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "357jdsq3",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  fetch: { cache: "force-cache" },
});

const imageProjection = `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

const projectProjection = `{
  "slug": slug.current,
  title,
  subtitle,
  category,
  portraitType,
  year,
  client,
  location,
  description,
  "cover": cover ${imageProjection},
  "images": images[] ${imageProjection}
}`;

type RawImage = { src?: string; width?: number; height?: number };

function validImage(raw: RawImage | null | undefined): raw is ProjectImage {
  return Boolean(raw?.src && raw?.width && raw?.height);
}

function mapProject(raw: Record<string, unknown> | null): Project | null {
  if (!raw?.slug || !raw?.title) return null;
  const images = (Array.isArray(raw.images) ? raw.images : []).filter(validImage);
  const cover = validImage(raw.cover as RawImage) ? (raw.cover as ProjectImage) : images[0];
  if (!cover || images.length === 0) return null;
  return {
    slug: String(raw.slug),
    title: String(raw.title),
    subtitle: String(raw.subtitle ?? ""),
    category: (raw.category ?? "editorials") as Project["category"],
    portraitType: raw.portraitType as Project["portraitType"],
    year: String(raw.year ?? ""),
    client: String(raw.client ?? ""),
    location: String(raw.location ?? "Berlin"),
    description: String(raw.description ?? ""),
    cover,
    images,
  };
}

export async function getProjects(): Promise<Project[]> {
  try {
    const raw = await sanityClient.fetch<Record<string, unknown>[]>(
      `*[_type == "project"] | order(orderRank asc) ${projectProjection}`
    );
    const mapped = raw.map(mapProject).filter((p): p is Project => p !== null);
    return mapped.length > 0 ? mapped : fallbackProjects;
  } catch (error) {
    console.error("sanity getProjects failed", error);
    return fallbackProjects;
  }
}

type RawEntry = {
  project?: Record<string, unknown> | null;
  image?: RawImage | null;
};

type RawModule = RawEntry & {
  _type?: string;
  text?: string;
  first?: RawEntry | null;
  second?: RawEntry | null;
};

function mapEntry(raw: RawEntry | null | undefined) {
  const project = mapProject(raw?.project ?? null);
  if (!project) return null;
  const image = validImage(raw?.image) ? (raw?.image as ProjectImage) : project.cover;
  return { project, image };
}

function mapModule(raw: RawModule): FeedModule | null {
  if (raw._type === "duoModule") {
    const first = mapEntry(raw.first);
    const second = mapEntry(raw.second);
    if (!first || !second) return null;
    return { type: "duo", first, second };
  }
  const entry = mapEntry(raw);
  if (!entry) return null;
  if (raw._type === "heroModule") return { type: "hero", entry };
  if (raw._type === "wideModule") return { type: "wide", entry };
  if (raw._type === "quoteModule") {
    const quote = raw.text?.trim() || entry.project.description;
    return { type: "quote", entry, quote };
  }
  return { type: "single", entry };
}

export async function getHomeModules(projects: Project[]): Promise<FeedModule[]> {
  try {
    const raw = await sanityClient.fetch<{ modules?: RawModule[] } | null>(
      `*[_type == "homepage"][0]{
        modules[]{
          _type,
          text,
          project-> ${projectProjection},
          image ${imageProjection},
          first{ project-> ${projectProjection}, image ${imageProjection} },
          second{ project-> ${projectProjection}, image ${imageProjection} }
        }
      }`
    );
    const modules = (raw?.modules ?? [])
      .map(mapModule)
      .filter((m): m is FeedModule => m !== null);
    return modules.length > 0 ? modules : buildFeed(projects);
  } catch {
    return buildFeed(projects);
  }
}

export type AboutContent = {
  portrait: ProjectImage;
  paragraphs: string[];
  printsTitle: string;
  printsText: string;
};

export const fallbackAbout: AboutContent = {
  portrait: {
    src: "/work/editorial/dayami-23-59/analog-portrait-berlin-fotografin-artist.webp",
    width: 800,
    height: 1186,
  },
  paragraphs: [
    "Elvira Nisman is a Berlin-based photographer and visual storyteller working across portrait, fashion, and film. Born in 1989 in Moldova, she moves fluidly between commercial and artistic practice — campaigns and lookbooks for fashion and lifestyle brands alongside shootings with artists and culturally influential personalities, as well as independent projects shown in exhibitions and at renowned art fairs.",
    "Her visual language sits at the intersection of strength and fragility, presence and absence, the tension between a person and the world around them. The result is imagery that feels intimate rather than staged; clean and minimal on the surface, with a poetic, sometimes bittersweet undertone underneath.",
  ],
  printsTitle: "Take a piece of the story home",
  printsText:
    "Limited edition prints, each one a moment caught between honesty and beauty.",
};

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const raw = await sanityClient.fetch<Record<string, unknown> | null>(
      `*[_type == "aboutPage"][0]{
        "portrait": portrait ${imageProjection},
        paragraphs,
        printsTitle,
        printsText
      }`
    );
    if (!raw) return fallbackAbout;
    const paragraphs = (Array.isArray(raw.paragraphs) ? raw.paragraphs : [])
      .map(String)
      .filter(Boolean);
    return {
      portrait: validImage(raw.portrait as RawImage)
        ? (raw.portrait as ProjectImage)
        : fallbackAbout.portrait,
      paragraphs: paragraphs.length ? paragraphs : fallbackAbout.paragraphs,
      printsTitle: String(raw.printsTitle ?? "") || fallbackAbout.printsTitle,
      printsText: String(raw.printsText ?? "") || fallbackAbout.printsText,
    };
  } catch {
    return fallbackAbout;
  }
}

export type ContactItem = { label: string; value: string; href?: string };

export const fallbackContact: ContactItem[] = [
  {
    label: "Email",
    value: "hello@elviranisman.com",
    href: "mailto:hello@elviranisman.com",
  },
  {
    label: "Instagram",
    value: "@elvira.nisman",
    href: "https://www.instagram.com/elvira.nisman",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/elviranisman",
    href: "https://www.linkedin.com/in/elviranisman/",
  },
];

export async function getContactItems(): Promise<ContactItem[]> {
  try {
    const raw = await sanityClient.fetch<{ items?: ContactItem[] } | null>(
      `*[_type == "contactPage"][0]{ items[]{ label, value, href } }`
    );
    const items = (raw?.items ?? []).filter((item) => item.label && item.value);
    return items.length ? items : fallbackContact;
  } catch {
    return fallbackContact;
  }
}

export type SocialContent = {
  eyebrow: string;
  title: string;
  calendlyUrl: string;
  services: { number: string; name: string; text: string }[];
  reels: { src: string; kind: string; title: string; href?: string }[];
  feedback: { quote: string; client: string }[];
  collabLabel: string;
  collabTitle: string;
  collabText: string;
  ctaLabel: string;
};

export const fallbackSocial: SocialContent = {
  eyebrow: "Content creation for",
  title: "Social media",
  calendlyUrl:
    "https://calendly.com/hello-elviranisman/kennenlerngesprach-let-s-work-together?month=2026-07",
  services: [
    {
      number: "01",
      name: "Brand strategy",
      text: "I offer a comprehensive brand strategy package that helps you define and strengthen your online presence. I start by understanding your brand’s core values, target audience, and industry positioning. From there, I create a tailored strategy that aligns with your business goals, ensuring consistency across all social media platforms. My approach focuses on building a strong, recognizable brand that connects with your audience and drives long-term success.",
    },
    {
      number: "02",
      name: "Content creation",
      text: "I craft high-quality, engaging content designed to capture your audience’s attention and bring your brand to life. From eye-catching visuals to compelling copy, I create content that reflects your brand identity and resonates with your followers. I plan, design, and schedule posts strategically, ensuring your social media feeds stay active and aligned with your marketing objectives. My goal is to help you tell your brand’s story in an authentic and impactful way.",
    },
  ],
  reels: [
    {
      src: "/work/social-media/goal-girls.mp4",
      kind: "Content creation",
      title: "Goalgirls",
      href: "https://www.instagram.com/reel/C5ODHK3s5v8/?igsh=ZTM0cnpmeXJpMXY5",
    },
    {
      src: "/work/social-media/reclaiming-the-night-unveiling-the-shadows.mp4",
      kind: "Fashion BTS video",
      title: "Reclaiming the night: unveiling the shadows",
      href: "https://www.instagram.com/reel/C8Zem7SsHMu/?igsh=MTUwOWtwY3Z4Mmltcg==",
    },
    {
      src: "/work/social-media/juicy.mp4",
      kind: "UGC content",
      title: "Juicy",
      href: "https://www.instagram.com/reel/CxAsJGMsluN/?igsh=MXF3NmhxYnJzb2Nwbg==",
    },
    {
      src: "/work/social-media/yoga-retreat.mp4",
      kind: "Content creation",
      title: "Yoga Retreat",
      href: "https://www.instagram.com/reel/C_IQ6iAIree/?igsh=ejF0NjExb210M2d4",
    },
  ],
  feedback: [
    {
      quote:
        "Ich hatte das Vergnügen, mit Elvira für das Shooting meiner Master-Abschlusskollektion im Fach Modedesign zusammenzuarbeiten und bin absolut begeistert! Die Kommunikation war schnell, einfach und effektiv. Das Shooting selbst war extrem schön, mit toller Atmosphäre, und Elvira hat schnell, effektiv und vor allem kreativ gearbeitet. Die Ergebnisse waren top!",
      client: "Charlotte Schwarzer",
    },
    {
      quote:
        "Such a lovely experience working with Ella! As a freelance Pilates / Gyrotonic instructor getting my business off the ground, her amazing social media skills, personable and professional presence, keen attention to your needs, warm way of working, and beautiful eye for aesthetic made her a joy to work with!",
      client: "Mins Aliyana",
    },
    {
      quote:
        "Elvira war sofort mit Begeisterung dabei, dieses Outdoor-Shooting umzusetzen. Sie nahm nicht nur Fotos auf, sondern hatte auch direkt Videocontent von jeder Szene mitgefilmt, sodass Social Media Posts, Stories und Website harmonisch Aufmerksamkeit generieren konnten. Danke fürs Vorausdenken, für deine Impulse und deine Liebe fürs Detail.",
      client: "Jennifer Beitel",
    },
    {
      quote:
        "Omg ich habs geliebt bei Elvira vor der Linse zu stehen. Ihr Style ist unglaublich. Sie hat mich genau so getroffen wie ich bin und ich mag mich auf jedem (!) einzelnen Foto. Die neuen Fotos treffen genau den Vibe meiner neuen Brand Identity. Gerne bald wieder!",
      client: "Corinna Fuchs",
    },
    {
      quote:
        "Das Shooting mit Elvira war wunderbar und krass empowernd! Die Ergebnisse sind wie sie selbst auch — bezaubernd, und ich hoffe es war nicht das letzte Mal.",
      client: "Elzan Zan",
    },
    {
      quote:
        "Ella ist eine tolle & unglaublich kreative Fotografin. Es ist nicht nur eine super professionelle Zusammenarbeit, sondern es macht auch einen riesigen Spaß! Ich finde ein Bild schöner als das Andere. 100%ige Empfehlung!",
      client: "Anja Weihpratizky",
    },
    {
      quote:
        "Liebsten Dank für die tollen Fotos. Das Shooting hat ganz viel Spaß gemacht und die Bilder wurden sehr schnell bearbeitet. Wirklich nur zu empfehlen!",
      client: "Sina",
    },
    {
      quote: "Super Shooting, tolle Bilder und sehr flexibel. Danke Ella!",
      client: "Nina Börries",
    },
    {
      quote: "Beste Fotografin!!",
      client: "Jonas Wolf",
    },
  ],
  collabLabel: "Collaboration",
  collabTitle: "Let's tell stories together",
  collabText:
    "The most important thing in my work is to understand fully the needs of my clients. With lots of experience as a photographer and content creator, plus dedication and communication, I deliver new value to any of your productions or visual projects.",
  ctaLabel: "Book a 15 min free consultation",
};

export async function getSocialContent(): Promise<SocialContent> {
  try {
    const raw = await sanityClient.fetch<Record<string, unknown> | null>(
      `*[_type == "socialMediaPage"][0]{
        eyebrow,
        title,
        calendlyUrl,
        services[]{ number, name, text },
        reels[]{ "src": video.asset->url, kind, title, url },
        feedback[]{ quote, client },
        collabLabel,
        collabTitle,
        collabText,
        ctaLabel
      }`
    );
    if (!raw) return fallbackSocial;
    const services = (Array.isArray(raw.services) ? raw.services : []).filter(
      (s: Record<string, unknown>) => s?.name
    );
    const reels = (Array.isArray(raw.reels) ? raw.reels : [])
      .filter((r: Record<string, unknown>) => r?.src && r?.title)
      .map((r: Record<string, unknown>) => ({
        src: String(r.src),
        kind: String(r.kind ?? ""),
        title: String(r.title),
        href: r.url ? String(r.url) : undefined,
      }));
    const feedback = (Array.isArray(raw.feedback) ? raw.feedback : []).filter(
      (f: Record<string, unknown>) => f?.quote && f?.client
    );
    return {
      eyebrow: String(raw.eyebrow ?? "") || fallbackSocial.eyebrow,
      title: String(raw.title ?? "") || fallbackSocial.title,
      calendlyUrl: String(raw.calendlyUrl ?? "") || fallbackSocial.calendlyUrl,
      services: services.length ? services : fallbackSocial.services,
      reels: reels.length ? reels : fallbackSocial.reels,
      feedback: feedback.length ? feedback : fallbackSocial.feedback,
      collabLabel: String(raw.collabLabel ?? "") || fallbackSocial.collabLabel,
      collabTitle: String(raw.collabTitle ?? "") || fallbackSocial.collabTitle,
      collabText: String(raw.collabText ?? "") || fallbackSocial.collabText,
      ctaLabel: String(raw.ctaLabel ?? "") || fallbackSocial.ctaLabel,
    };
  } catch {
    return fallbackSocial;
  }
}
