import { createReadStream } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@sanity/client";
import { projects } from "../lib/projects";
import { buildFeed, type FeedEntry, type FeedModule } from "../lib/homeFeed";
import { fallbackAbout, fallbackContact, fallbackSocial } from "../lib/sanity";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Set SANITY_WRITE_TOKEN (Editor token from sanity.io/manage)");
  process.exit(1);
}

const client = createClient({
  projectId: "357jdsq3",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const root = process.cwd();
const assetCache = new Map<string, string>();
let key = 0;
const nextKey = () => `seed-${(key += 1)}`;

async function uploadAsset(kind: "image" | "file", src: string) {
  const cached = assetCache.get(src);
  if (cached) return cached;
  const path = join(root, "public", src);
  const asset = await client.assets.upload(kind, createReadStream(path), {
    filename: basename(src),
  });
  assetCache.set(src, asset._id);
  console.log("uploaded", src);
  return asset._id;
}

const imageRef = (assetId: string) => ({
  _type: "image",
  asset: { _type: "reference", _ref: assetId },
});

async function seedProjects() {
  for (const [index, project] of projects.entries()) {
    for (let start = 0; start < project.images.length; start += 4) {
      await Promise.all(
        project.images
          .slice(start, start + 4)
          .map((image) => uploadAsset("image", image.src))
      );
    }
    const coverId = await uploadAsset("image", project.cover.src);
    await client.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      subtitle: project.subtitle,
      slug: { _type: "slug", current: project.slug },
      category: project.category,
      ...(project.portraitType ? { portraitType: project.portraitType } : {}),
      year: project.year,
      client: project.client,
      location: project.location,
      description: project.description,
      cover: imageRef(coverId),
      images: project.images.map((image) => ({
        ...imageRef(assetCache.get(image.src) as string),
        _key: nextKey(),
      })),
      order: (index + 1) * 10,
    });
    console.log("project", project.slug);
  }
}

async function moduleEntry(entry: FeedEntry) {
  const assetId = await uploadAsset("image", entry.image.src);
  return {
    project: { _type: "reference", _ref: `project-${entry.project.slug}` },
    image: imageRef(assetId),
  };
}

async function seedHomepage() {
  const feed = buildFeed(projects);
  const modules = [];
  for (const module of feed) {
    if (module.type === "duo") {
      modules.push({
        _type: "duoModule",
        _key: nextKey(),
        first: await moduleEntry(module.first),
        second: await moduleEntry(module.second),
      });
    } else if (module.type === "quote") {
      modules.push({
        _type: "quoteModule",
        _key: nextKey(),
        text: module.quote,
        ...(await moduleEntry(module.entry)),
      });
    } else {
      modules.push({
        _type: `${module.type}Module`,
        _key: nextKey(),
        ...(await moduleEntry(module.entry)),
      });
    }
  }
  await client.createOrReplace({ _id: "homepage", _type: "homepage", modules });
  console.log("homepage", modules.length, "modules");
}

async function seedAbout() {
  const portraitId = await uploadAsset("image", fallbackAbout.portrait.src);
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    portrait: imageRef(portraitId),
    paragraphs: fallbackAbout.paragraphs,
    printsTitle: fallbackAbout.printsTitle,
    printsText: fallbackAbout.printsText,
  });
  console.log("aboutPage");
}

async function seedContact() {
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    items: fallbackContact.map((item) => ({
      _type: "contactItem",
      _key: nextKey(),
      ...item,
    })),
  });
  console.log("contactPage");
}

async function seedSocial() {
  const reels = [];
  for (const reel of fallbackSocial.reels) {
    const assetId = await uploadAsset("file", reel.src);
    reels.push({
      _type: "reel",
      _key: nextKey(),
      video: { _type: "file", asset: { _type: "reference", _ref: assetId } },
      kind: reel.kind,
      title: reel.title,
      url: reel.href,
    });
  }
  await client.createOrReplace({
    _id: "socialMediaPage",
    _type: "socialMediaPage",
    eyebrow: fallbackSocial.eyebrow,
    title: fallbackSocial.title,
    calendlyUrl: fallbackSocial.calendlyUrl,
    services: fallbackSocial.services.map((service) => ({
      _type: "service",
      _key: nextKey(),
      ...service,
    })),
    reels,
    feedback: fallbackSocial.feedback.map((review) => ({
      _type: "review",
      _key: nextKey(),
      ...review,
    })),
    collabLabel: fallbackSocial.collabLabel,
    collabTitle: fallbackSocial.collabTitle,
    collabText: fallbackSocial.collabText,
    ctaLabel: fallbackSocial.ctaLabel,
  });
  console.log("socialMediaPage");
}

async function main() {
  await seedProjects();
  await seedHomepage();
  await seedAbout();
  await seedContact();
  await seedSocial();
  console.log("done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
