"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useMountEffect } from "@/hooks/useMountEffect";
import { categories } from "@/lib/projects";

const bigLinks = [
  ...categories.map((category) => ({ label: category, href: `/${category}` })),
  { label: "Social media", href: "/social-media" },
];

const smallLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: "/shop" },
];

export function AppHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const lenis = useLenis();

  const openMenu = () => {
    setMenuOpen(true);
    menuOpenRef.current = true;
    lenis?.stop();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuOpenRef.current = false;
    lenis?.start();
  };

  useMountEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpenRef.current) closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const linkClass = (href: string, base: string) =>
    `${base}${pathname === href ? " -active" : ""}`;

  return (
    <>
      <header className="appHeader">
        <Link href="/" className="heading">
          Elvira Nisman
        </Link>
        <button className="menuToggle" onClick={openMenu}>
          Menu
        </button>
      </header>
      <div className={`menuScreen${menuOpen ? " -open" : ""}`}>
        <div className="bar">
          <Link href="/" className="brand" onClick={closeMenu}>
            Elvira Nisman
          </Link>
          <button className="close" onClick={closeMenu}>
            Close
          </button>
        </div>
        <nav className="big">
          {bigLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className={linkClass(link.href, "bigLink")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="small">
          {smallLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className={linkClass(link.href, "smallLink")}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
