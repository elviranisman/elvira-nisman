import type { Metadata } from "next";
import { getContactItems } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact — Elvira Nisman",
  description: "Contact Elvira Nisman — Berlin-based photographer.",
};

export default async function ContactPage() {
  const contacts = await getContactItems();

  return (
    <div className="contactPage">
      <h1 className="pageTitle">Contact</h1>
      <ul className="list">
        {contacts.map((contact) => (
          <li key={contact.label} className="item">
            <a
              href={contact.href}
              target={contact.href?.startsWith("http") ? "_blank" : undefined}
              rel={contact.href?.startsWith("http") ? "noreferrer" : undefined}
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
