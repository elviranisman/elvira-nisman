"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLenis } from "lenis/react";
import { categories } from "@/lib/projects";

const siteLinks = [
  { label: "Social media", href: "/social-media" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: undefined },
];

function CategoryLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category}
          href={`/${category}`}
          onClick={onNavigate}
          className={`link${pathname === `/${category}` ? " -active" : ""}`}
        >
          {category}
        </Link>
      ))}
    </>
  );
}

function SiteLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {siteLinks.map((link) =>
        link.href ? (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className={`link${pathname === link.href ? " -active" : ""}`}
          >
            {link.label}
          </Link>
        ) : (
          <a key={link.label} className="link">
            {link.label}
          </a>
        )
      )}
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
    lenis?.start();
  };

  return (
    <>
      <header className="appHeader">
        <nav className="nav">
          <div className="group">
            <CategoryLinks />
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
          <CategoryLinks onNavigate={closeMenu} />
          <SiteLinks onNavigate={closeMenu} />
        </nav>
      </div>
    </>
  );
}
