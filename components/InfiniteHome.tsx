"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMountEffect } from "@/hooks/useMountEffect";

gsap.registerPlugin(useGSAP);

const driftSpeed = 14;

export function InfiniteHome({ children }: { children: React.ReactNode }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const drift = useRef(0);
  const rotation = useRef(0);
  const lastY = useRef(0);
  const lenis = useLenis();

  useMountEffect(() => {
    const measure = () => {
      const height = firstCopyRef.current?.offsetHeight ?? 0;
      if (spacerRef.current) {
        spacerRef.current.style.height = `${height + window.innerHeight}px`;
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (firstCopyRef.current) observer.observe(firstCopyRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  });

  useGSAP(
    () => {
      if (!lenis) return;
      const tick = (_time: number, deltaTime: number) => {
        const limit = Math.max(lenis.limit, 1);
        drift.current += (deltaTime / 1000) * driftSpeed;
        const y = (((lenis.scroll + drift.current) % limit) + limit) % limit;
        let delta = y - lastY.current;
        if (delta > limit / 2) delta -= limit;
        if (delta < -limit / 2) delta += limit;
        lastY.current = y;
        rotation.current += delta * 0.12;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(0, ${-y}px, 0)`;
        }
        if (badgeRef.current) {
          badgeRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation.current}deg)`;
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    { dependencies: [lenis] }
  );

  return (
    <>
      <div ref={spacerRef} className="scrollSpacer" />
      <div ref={trackRef} className="infiniteTrack">
        <div ref={firstCopyRef}>{children}</div>
        <div aria-hidden>{children}</div>
      </div>
      <div ref={badgeRef} className="scrollBadge">
        <span className="mark">EN</span>
      </div>
    </>
  );
}
