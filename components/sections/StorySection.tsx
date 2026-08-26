"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { couple, media } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { Countdown } from "@/components/ui/Countdown";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { createWordReveal, createFadeReveal } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function StorySection() {
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      createFadeReveal({ trigger: motifRef, reducedMotion, y: 20 });
      if (greetingRef.current) {
        createWordReveal({ trigger: greetingRef, reducedMotion, stagger: 0.06 });
      }
      if (bodyRef.current) {
        const paragraphs = bodyRef.current.querySelectorAll("p");
        paragraphs.forEach((p, i) => {
          gsapSetReveal(p as HTMLElement, reducedMotion, i * 0.15);
        });
      }
      createFadeReveal({ trigger: closingRef, reducedMotion, start: "top 90%" });
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <SectionWrapper id="story" className="bg-champagne-gradient">
      <ParticleLayer mood="day" id="story-particles" />

      <div className="relative z-10 mx-auto max-w-2xl section-padding text-center">
        <div ref={motifRef} className="mb-1 flex flex-col items-center gap-8">
          <Countdown />
          <Image
            src={media.motifs.ganesh}
            alt=""
            width={48}
            height={48}
            className="opacity-40"
          />
        </div>

        {/* <p
          ref={greetingRef}
          className="font-display text-2xl text-gold-foil md:text-3xl"
        >
          {couple.welcomeNote.greeting}
        </p> */}

        <OrnamentalDivider className="my-8" />

        <div ref={bodyRef} className="space-y-6 text-left">
          {couple.welcomeNote.body.map((paragraph, index) => (
            <p
              key={index}
              className="font-body text-base leading-relaxed text-primary-700 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <OrnamentalDivider className="my-8" />

        <p ref={closingRef} className="font-display text-lg text-primary-600">
          {couple.welcomeNote.closing}
        </p>
      </div>
    </SectionWrapper>
  );
}

function gsapSetReveal(el: HTMLElement, reducedMotion: boolean, delay: number) {
  if (reducedMotion) {
    gsap.set(el, { opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => gsap.to(el, { opacity: 1, duration: 0.6, delay }),
    });
    return;
  }

  gsap.set(el, { opacity: 0, y: 30 });
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
}
