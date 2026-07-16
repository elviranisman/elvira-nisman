import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Elvira Nisman",
  description: "Contact Elvira Nisman — Berlin-based photographer.",
};

const contacts = [
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

export default function ContactPage() {
  return (
    <div className="contactPage">
      <h1 className="pageTitle">Contact</h1>
      <ul className="list">
        {contacts.map((contact) => (
          <li key={contact.label} className="item">
            <a
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="label">{contact.label}</span>
              <span className="value">{contact.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
