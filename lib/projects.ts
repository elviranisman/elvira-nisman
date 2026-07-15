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
  portraitType?: "artists" | "actors" | "models" | "business";
  year: string;
  client: string;
  location: string;
  description: string;
  cover: ProjectImage;
  images: ProjectImage[];
};

function img(folder: string, file: string, width: number, height: number): ProjectImage {
  return { src: `/${folder}/${file}`, width, height };
}

const f1 = "23-59-a-fashion-story";
const f2 = "ana-rayse-pilates";
const f3 = "anya-studio-editorial-for-solebox-hub";
const f4 = "auna-studio-jewelry-campaign-shooting";
const f5 = "boys-lookbook-for-ziehe";
const f6 = "clara-an-intimate-home-story";
const f7 = "unveil-the-light-fashion-story-as-part-of-an-HTW-graduation";

export const projects: Project[] = [
  {
    slug: f1,
    title: "23:59",
    subtitle: "A fashion story",
    category: "editorials",
    year: "2024",
    client: "Self-initiated",
    location: "Berlin",
    description:
      "A fashion story set in the last minute before midnight. Sharp silhouettes and restless light trace the tension between elegance and urgency, shot on location across Berlin.",
    cover: img(f1, "berlin_photography_model_editorial.jpg", 1000, 1543),
    images: [
      img(f1, "berlin_photography_model_editorial.jpg", 1000, 1543),
      img(f1, "editorial_berlin_photographer-1-1408x2048.jpg", 1408, 2048),
      img(f1, "editorial_mode_fashion_berlin_photographer.jpg", 1300, 888),
      img(f1, "editorial_model_Sedcard_berlin_photography.jpg", 1200, 878),
      img(f1, "faShion_berlin_mode_fotograf.jpg", 1000, 1502),
      img(f1, "faShion_photography_berlin_editorial.jpg", 1200, 1782),
      img(f1, "portrait_berlin_fotograf_mode.jpg", 1200, 1780),
      img(f1, "portrait_model_sedcard_berlin-.jpg", 1200, 1779),
    ],
  },
  {
    slug: f4,
    title: "Auna Studio",
    subtitle: "Jewelry campaign",
    category: "commercial",
    year: "2024",
    client: "Auna Studio",
    location: "Berlin Mitte",
    description:
      "Campaign photography for Auna Studio. Jewelry treated as sculpture — precise compositions, calm skin tones and a quiet studio light that lets the metal speak.",
    cover: img(f4, "Berlin_fashion_photographer_Elvira_nisman.jpg", 1500, 1871),
    images: [
      img(f4, "Berlin_fashion_mode_schmuck_fotograf.jpg", 1000, 1501),
      img(f4, "Berlin_fashion_photographer_Elvira_nisman.jpg", 1500, 1871),
      img(f4, "Berlin_photography_artist_elvira_nisman.jpg", 1500, 1852),
      img(f4, "Headshoots_berlin_mitte_fotograf.jpg", 1000, 1393),
      img(f4, "Portrait_berlin_fotograf_people.jpg", 1500, 2250),
      img(f4, "commercial_ecommerce_berlin_photographer-1389x2048.jpg", 1389, 2048),
      img(f4, "portrait_ecommerce_elvira_niman-1474x2048.jpg", 1474, 2048),
    ],
  },
  {
    slug: f3,
    title: "Anya Studio",
    subtitle: "Editorial for Solebox Hub",
    category: "editorials",
    year: "2024",
    client: "Solebox Hub",
    location: "Berlin",
    description:
      "Studio editorial produced with Anya Studio for Solebox Hub. Clean backdrops, strong poses and a wardrobe that moves between streetwear and tailoring.",
    cover: img(f3, "fashion_mode_editorial_berlin.jpg", 1500, 2021),
    images: [
      img(f3, "berlin_photographer_model_agency.jpg", 1100, 1652),
      img(f3, "editorial_berlin_photographer.jpg", 1500, 1998),
      img(f3, "editorial_fashion_berlin_fotograf.jpg", 1500, 2211),
      img(f3, "editorial_fashion_studio_photography_berlin.jpg", 1500, 1971),
      img(f3, "fashion_mode_editorial_berlin.jpg", 1500, 2021),
      img(f3, "fashion_mode_fotograf_berlin_ecommerce.jpg", 1000, 1469),
      img(f3, "fashion_modefotograf_berlin.jpg", 1500, 2237),
      img(f3, "portrait_editorial_mode_Berlin_photography-1478x2048.jpg", 1478, 2048),
    ],
  },
  {
    slug: f5,
    title: "Boys Lookbook",
    subtitle: "For Ziehe",
    category: "commercial",
    year: "2023",
    client: "Ziehe",
    location: "Berlin",
    description:
      "Lookbook for Ziehe. A loose, documentary approach to menswear — honest postures, daylight and the texture of the city between takes.",
    cover: img(f5, "DSCF7619-Kopie.jpg", 1200, 1575),
    images: [
      img(f5, "DSCF7449-Kopie.jpg", 1000, 1356),
      img(f5, "DSCF7460-Kopie.jpg", 1000, 1390),
      img(f5, "DSCF7619-Kopie.jpg", 1200, 1575),
      img(f5, "DSCF7641-Kopie.jpg", 1200, 1814),
      img(f5, "DSCF7794-Kopie.jpg", 1200, 1647),
      img(f5, "DSCF7806-Kopie.jpg", 1200, 1756),
      img(f5, "DSCF7912-Kopie.jpg", 1200, 1797),
      img(f5, "DSCF8083-Kopie.jpg", 1200, 1689),
    ],
  },
  {
    slug: f6,
    title: "Clara",
    subtitle: "An intimate home story",
    category: "portrait",
    portraitType: "models",
    year: "2023",
    client: "Personal work",
    location: "Berlin",
    description:
      "An intimate story photographed at home with Clara. Soft mornings, unmade light and the small gestures that only exist when nobody is performing.",
    cover: img(f6, "DSCF2405-Kopie.jpg", 1200, 1572),
    images: [
      img(f6, "4226-5-copiar-2-edit.jpg", 900, 1400),
      img(f6, "4226-5-copiar-Kopie.jpg", 1000, 1423),
      img(f6, "DSCF2301-Kopie.jpg", 1200, 1756),
      img(f6, "DSCF2317-Kopie.jpg", 1200, 1685),
      img(f6, "DSCF2399.jpg", 1200, 1732),
      img(f6, "DSCF2405-Kopie.jpg", 1200, 1572),
      img(f6, "DSCF2420-Kopie.jpg", 1200, 1656),
      img(f6, "DSCF2434-Kopie.jpg", 1200, 1770),
    ],
  },
  {
    slug: f2,
    title: "Ana Rayse",
    subtitle: "Pilates",
    category: "portrait",
    portraitType: "business",
    year: "2023",
    client: "Ana Rayse",
    location: "Berlin",
    description:
      "Brand imagery for pilates instructor Ana Rayse. Movement held still — controlled strength, open air and portraits that stay close to the person.",
    cover: img(f2, "portrait_berlin_nisman_outdoors.jpg", 1200, 1797),
    images: [
      img(f2, "Portrait_woman_photographer_berlin-1.jpg", 1200, 1797),
      img(f2, "Sport_photography_berlin_nisman.jpg", 1200, 818),
      img(f2, "Yoga_sport_shooting_berlin_nisman.jpg", 1200, 802),
      img(f2, "neu-fnal-Kopie.jpg", 1200, 802),
      img(f2, "portrait_berlin_nisman_outdoors.jpg", 1200, 1797),
    ],
  },
  {
    slug: f7,
    title: "Unveil the Light",
    subtitle: "HTW graduation fashion story",
    category: "editorials",
    year: "2022",
    client: "HTW Berlin",
    location: "Berlin",
    description:
      "A fashion story created as part of an HTW Berlin graduation collection. Fabric, shadow and skin arranged around a single idea: letting the light undress the garment.",
    cover: img(f7, "DSCF4104-Kopie.jpg", 1300, 1900),
    images: [
      img(f7, "DSCF3517-Kopie.jpg", 1200, 1800),
      img(f7, "DSCF3929-Kopie-1.jpg", 1200, 1764),
      img(f7, "DSCF3988-copy-Kopie.jpg", 1300, 1892),
      img(f7, "DSCF4104-Kopie.jpg", 1300, 1900),
      img(f7, "DSCF4174-Kopie.jpg", 1300, 1940),
      img(f7, "DSCF4253-Kopie.jpg", 1300, 1892),
      img(f7, "DSCF4330-Kopie.jpg", 1200, 1697),
      img(f7, "R1-05210-0011-copy.jpg", 1000, 1441),
    ],
  },
];

export const categories = ["editorials", "commercial", "portrait", "events"] as const;

export type Category = (typeof categories)[number];
