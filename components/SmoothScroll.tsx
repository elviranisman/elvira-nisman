"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const infinite = pathname === "/";

  useGSAP(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  });

  return (
    <ReactLenis
      key={infinite ? "infinite" : "default"}
      root
      options={{ autoRaf: false, infinite, syncTouch: infinite }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
