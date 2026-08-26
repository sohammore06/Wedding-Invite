"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LenisScrollTriggerSync } from "./LenisScrollTriggerSync";

type ScrollContextValue = {
  lenisRef: React.RefObject<LenisRef | null>;
  isScrollLocked: boolean;
  unlockScroll: () => void;
  lockScroll: () => void;
  scrollTo: (target: number | string) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const reducedMotion = useReducedMotion();

  useSmoothScroll(lenisRef);

  useEffect(() => {
    if (isScrollLocked) {
      lenisRef.current?.lenis?.stop();
    }
  }, [isScrollLocked]);

  const unlockScroll = useCallback(() => {
    setIsScrollLocked(false);
    lenisRef.current?.lenis?.start();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const lockScroll = useCallback(() => {
    setIsScrollLocked(true);
    lenisRef.current?.lenis?.stop();
  }, []);

  const scrollTo = useCallback(
    (target: number | string) => {
      lenisRef.current?.lenis?.scrollTo(target, {
        duration: reducedMotion ? 0 : 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    },
    [reducedMotion]
  );

  return (
    <ScrollContext.Provider
      value={{
        lenisRef,
        isScrollLocked,
        unlockScroll,
        lockScroll,
        scrollTo,
      }}
    >
      <ReactLenis
        ref={lenisRef}
        root
        options={{
          lerp: reducedMotion ? 1 : 0.1,
          smoothWheel: !reducedMotion,
          autoRaf: false,
          wheelMultiplier: 0.9,
        }}
      >
        <LenisScrollTriggerSync />
        {children}
      </ReactLenis>
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within SmoothScrollProvider");
  }
  return context;
}
