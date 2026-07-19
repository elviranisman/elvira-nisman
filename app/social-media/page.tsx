import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social media — Elvira Nisman",
  description:
    "Content creation for social media — brand strategy and content creation by Elvira Nisman, Berlin.",
};

const calendly =
  "https://calendly.com/hello-elviranisman/kennenlerngesprach-let-s-work-together?month=2026-07";

const services = [
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
];

const reels = [
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
];

const feedback = [
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
];

export default function SocialMediaPage() {
  return (
    <div className="socialPage">
      <p className="eyebrow">Content creation for</p>
      <h1 className="pageTitle">Social media</h1>
      <div className="services">
        {services.map((service) => (
          <section key={service.number} className="service">
            <p className="num">{service.number}</p>
            <div className="body">
              <h2 className="name">{service.name}</h2>
              <p className="text">{service.text}</p>
              <a className="book" href={calendly} target="_blank" rel="noreferrer">
                Book service
              </a>
            </div>
          </section>
        ))}
      </div>
      <div className="reels">
        <p className="label">Selected content</p>
        <ul className="grid">
          {reels.map((reel) => (
            <li key={reel.src} className="reel">
              <a href={reel.href} target="_blank" rel="noreferrer">
                <video
                  className="video"
                  src={reel.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <p className="kind">{reel.kind}</p>
                <p className="name">{reel.title}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="feedback">
        <p className="label">Feedback</p>
        <ul className="quotes">
          {feedback.map((entry) => (
            <li key={entry.client} className="entry">
              <p className="stars">★★★★★</p>
              <blockquote className="quote">{entry.quote}</blockquote>
              <p className="client">
                {entry.client}
                <span className="role"> — Google review</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="collab">
        <p className="label">Collaboration</p>
        <h2 className="title">Let&apos;s tell stories together</h2>
        <p className="text">
          The most important thing in my work is to understand fully the needs
          of my clients. With lots of experience as a photographer and content
          creator, plus dedication and communication, I deliver new value to
          any of your productions or visual projects.
        </p>
        <a className="cta" href={calendly} target="_blank" rel="noreferrer">
          Book a 15 min free consultation
        </a>
      </div>
    </div>
  );
}
