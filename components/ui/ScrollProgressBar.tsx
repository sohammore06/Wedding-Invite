"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { useScroll } from "@/components/providers/SmoothScrollProvider";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const { isScrollLocked } = useScroll();

  useLenis((lenis) => {
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transform = `scaleX(${lenis.progress})`;
  }, []);

  if (isScrollLocked) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-0.5 bg-secondary-200/50">
      <div
        ref={barRef}
        className="h-full origin-left bg-gold-foil will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
