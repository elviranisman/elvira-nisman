"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLenis } from "lenis/react";
import { categories } from "@/lib/projects";

const siteLinks = ["Social media", "About", "Contact", "Shop"];

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

function SiteLinks() {
  return (
    <>
      {siteLinks.map((label) => (
        <a key={label} className="link">
          {label}
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
          <SiteLinks />
        </nav>
      </div>
    </>
  );
}
