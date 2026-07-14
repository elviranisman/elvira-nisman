"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMountEffect } from "@/hooks/useMountEffect";

gsap.registerPlugin(useGSAP);

const driftSpeed = 14;

function whenPageReady() {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) =>
          window.addEventListener("load", resolve, { once: true })
        );
  const timeout = new Promise((resolve) => setTimeout(resolve, 3500));
  return Promise.race([loaded, timeout]);
}

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
    (_context, contextSafe) => {
      if (!lenis || !firstCopyRef.current || !contextSafe) return;
      const root = document.documentElement;
      if (root.classList.contains("-loaded")) return;

      lenis.stop();

      const images = gsap.utils.toArray<HTMLElement>(
        firstCopyRef.current.querySelectorAll(".thumbnail>.image")
      );
      const infos = gsap.utils.toArray<HTMLElement>(
        firstCopyRef.current.querySelectorAll(".thumbnail>.info")
      );

      const finish = () => {
        root.classList.add("-loaded");
        lenis.start();
      };

      if (images.length === 0) {
        root.classList.add("-stacked");
        finish();
        return;
      }

      const run = contextSafe(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const stackWidth = Math.min(300, window.innerWidth * 0.42);

        const pile = images.map((image) => {
          const rect = image.getBoundingClientRect();
          return {
            x: centerX - (rect.left + rect.width / 2),
            y: centerY - (rect.top + rect.height / 2),
            scale: stackWidth / rect.width,
          };
        });

        images.forEach((image, index) => {
          gsap.set(image, {
            x: pile[index].x,
            y: pile[index].y - 56,
            scale: pile[index].scale,
            visibility: "hidden",
            zIndex: index + 1,
          });
        });
        gsap.set(infos, { opacity: 0 });
        root.classList.add("-stacked");

        const timeline = gsap.timeline({
          onComplete: finish,
          defaults: { force3D: true },
        });

        const buildStagger = 0.42;
        const buildDuration = 1.3;
        images.forEach((image, index) => {
          timeline.set(image, { visibility: "visible" }, 0.6 + index * buildStagger);
          timeline.to(
            image,
            {
              y: pile[index].y,
              duration: buildDuration,
              ease: "power2.out",
            },
            0.6 + index * buildStagger
          );
        });

        const flyStart =
          0.6 + (images.length - 1) * buildStagger + buildDuration + 1.1;
        [...images].reverse().forEach((image, index) => {
          timeline.to(
            image,
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.9,
              ease: "power3.inOut",
              clearProps: "zIndex",
            },
            flyStart + index * 0.42
          );
        });
        timeline.to(
          infos,
          { opacity: 1, duration: 0.9, stagger: 0.08, ease: "power2.out" },
          "-=1.2"
        );
      });

      whenPageReady().then(run);
    },
    { dependencies: [lenis] }
  );

  useGSAP(
    () => {
      if (!lenis) return;
      const tick = (_time: number, deltaTime: number) => {
        const limit = Math.max(lenis.limit, 1);
        if (document.documentElement.classList.contains("-loaded")) {
          drift.current += (deltaTime / 1000) * driftSpeed;
        }
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
