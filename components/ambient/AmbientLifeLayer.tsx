"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { media } from "@/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type AmbientCreature = {
  id: string;
  src: string;
  section: string;
  direction: "left" | "right";
  top: string;
  size: number;
};

const creatures: AmbientCreature[] = [
  {
    id: "bird-1",
    src: media.ambient.bird,
    section: "story",
    direction: "right",
    top: "15%",
    size: 40,
  },
  {
    id: "butterfly-1",
    src: media.ambient.butterfly,
    section: "couple",
    direction: "left",
    top: "25%",
    size: 32,
  },
  {
    id: "bird-2",
    src: media.ambient.bird,
    section: "timeline",
    direction: "right",
    top: "20%",
    size: 36,
  },
  {
    id: "butterfly-2",
    src: media.ambient.butterfly,
    section: "gallery",
    direction: "left",
    top: "30%",
    size: 28,
  },
];

export function AmbientLifeLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;

      creatures.forEach((creature) => {
        const el = containerRef.current?.querySelector(
          `[data-creature="${creature.id}"]`
        );
        const section = document.getElementById(creature.section);
        if (!el || !section) return;

        const startX = creature.direction === "right" ? "-10vw" : "110vw";
        const endX = creature.direction === "right" ? "110vw" : "-10vw";

        gsap.set(el, { x: startX, opacity: 0 });

        gsap.to(el, {
          x: endX,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onEnter: () => gsap.to(el, { opacity: 0.7, duration: 0.5 }),
            onLeave: () => gsap.to(el, { opacity: 0, duration: 0.5 }),
            onEnterBack: () => gsap.to(el, { opacity: 0.7, duration: 0.5 }),
            onLeaveBack: () => gsap.to(el, { opacity: 0, duration: 0.5 }),
          },
        });
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {creatures.map((creature) => (
        <div
          key={creature.id}
          data-creature={creature.id}
          className="absolute opacity-0"
          style={{ top: creature.top }}
        >
          <Image
            src={creature.src}
            alt=""
            width={creature.size}
            height={creature.size}
            className="opacity-60"
          />
        </div>
      ))}
    </div>
  );
}
