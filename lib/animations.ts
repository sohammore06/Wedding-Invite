"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function splitTextIntoWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent ?? "";
  element.innerHTML = "";
  element.setAttribute("aria-label", text);

  return text.split(/(\s+)/).map((part) => {
    const span = document.createElement("span");
    span.textContent = part;
    span.style.display = "inline-block";
    span.style.whiteSpace = part.trim() === "" ? "pre" : "normal";
    if (part.trim()) {
      span.setAttribute("aria-hidden", "true");
    }
    element.appendChild(span);
    return span;
  });
}

type RevealOptions = {
  trigger: RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  stagger?: number;
  start?: string;
};

export function createWordReveal({
  trigger,
  reducedMotion = false,
  stagger = 0.04,
  start = "top 80%",
}: RevealOptions) {
  const el = trigger.current;
  if (!el) return null;

  const words = splitTextIntoWords(el);

  if (reducedMotion) {
    gsap.set(words, { opacity: 0 });
    return ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(words, { opacity: 1, duration: 0.6, stagger: 0.02 });
      },
    });
  }

  gsap.set(words, { opacity: 0, y: 20 });
  return gsap.to(words, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none reverse",
    },
  });
}

type FadeRevealOptions = {
  trigger: RefObject<HTMLElement | null>;
  reducedMotion?: boolean;
  start?: string;
  y?: number;
};

export function createFadeReveal({
  trigger,
  reducedMotion = false,
  start = "top 85%",
  y = 40,
}: FadeRevealOptions) {
  const el = trigger.current;
  if (!el) return null;

  if (reducedMotion) {
    gsap.set(el, { opacity: 0 });
    return ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => gsap.to(el, { opacity: 1, duration: 0.6 }),
    });
  }

  gsap.set(el, { opacity: 0, y });
  return gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: el,
      start,
      toggleActions: "play none none reverse",
    },
  });
}
