"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  const lenis = useLenis((instance) => {
    const value = instance.scroll > window.innerHeight * 0.8;
    if (visibleRef.current !== value) {
      visibleRef.current = value;
      setVisible(value);
    }
  });

  return (
    <button
      className={`backToTop${visible ? " -visible" : ""}`}
      onClick={() => lenis?.scrollTo(0)}
    >
      Top
    </button>
  );
}
