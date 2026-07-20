"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useMountEffect } from "@/hooks/useMountEffect";
import { categories } from "@/lib/projects";

export type MenuPreview = {
  type: "image" | "video";
  src: string;
  width?: number;
  height?: number;
};

const bigLinks = [
  ...categories.map((category) => ({ label: category, href: `/${category}` })),
  { label: "Social media", href: "/social-media" },
];

const smallLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shop", href: "/shop" },
];

export function AppHeader({
  previews = {},
}: {
  previews?: Record<string, MenuPreview>;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
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
    setHovered(null);
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

  const preview = hovered ? previews[hovered] : undefined;

  return (
    <>
      <header className="appHeader">
        <Link href="/" className="heading">
          <span className="full">Elvira Nisman</span>
          <span className="short">EN</span>
        </Link>
        <button className="menuToggle" onClick={openMenu}>
          Menu
        </button>
      </header>
      <div className={`menuScreen${menuOpen ? " -open" : ""}`}>
        {preview && (
          <div className="preview" key={hovered}>
            {preview.type === "video" ? (
              <video
                className="media -video"
                src={preview.src}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image
                className="media"
                src={preview.src}
                alt=""
                width={preview.width ?? 800}
                height={preview.height ?? 1000}
                sizes="30vw"
              />
            )}
          </div>
        )}
        <div className="bar">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="full">Elvira Nisman</span>
            <span className="short">EN</span>
          </Link>
          <button className="close" onClick={closeMenu}>
            Close
          </button>
        </div>
        <nav className="big" onMouseLeave={() => setHovered(null)}>
          {bigLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              onMouseEnter={() => setHovered(link.href)}
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
