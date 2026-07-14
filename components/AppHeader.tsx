"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useLenis } from "lenis/react";
import { categories } from "@/lib/projects";

const siteLinks = [
  { href: "https://www.instagram.com/elviranisman", label: "Social media" },
  { href: undefined, label: "About" },
  { href: "mailto:hello@monk.haus", label: "Contact" },
  { href: undefined, label: "Shop" },
];

function CategoryLinks({ onNavigate }: { onNavigate?: () => void }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/?category=${category}`}
          onClick={onNavigate}
          className={`link${activeCategory === category ? " -active" : ""}`}
        >
          {category}
        </Link>
      ))}
    </>
  );
}

function SiteLinks() {
  return (
    <>
      {siteLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="link"
          target={link.href?.startsWith("http") ? "_blank" : undefined}
          rel={link.href?.startsWith("http") ? "noreferrer" : undefined}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

export function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  const openMenu = () => {
    setMenuOpen(true);
    lenis?.stop();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    if (document.documentElement.classList.contains("-loaded")) {
      lenis?.start();
    }
  };

  return (
    <>
      <header className="appHeader">
        <nav className="nav">
          <div className="group">
            <Suspense fallback={null}>
              <CategoryLinks />
            </Suspense>
          </div>
          <div className="group -right">
            <SiteLinks />
          </div>
        </nav>
        <Link href="/" className="heading">
          Elvira Nisman
        </Link>
        <button className="menuToggle" onClick={openMenu}>
          Menu
        </button>
      </header>
      <div className={`mobileMenu${menuOpen ? " -open" : ""}`}>
        <button className="close" onClick={closeMenu}>
          Close
        </button>
        <nav className="links">
          <Suspense fallback={null}>
            <CategoryLinks onNavigate={closeMenu} />
          </Suspense>
          <SiteLinks />
        </nav>
      </div>
    </>
  );
}
