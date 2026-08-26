"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { couple } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { createFadeReveal } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CoupleSection() {
  const brideRef = useRef<HTMLDivElement>(null);
  const groomRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      [brideRef, groomRef].forEach((ref) => {
        const el = ref.current;
        if (!el) return;

        if (reducedMotion) {
          gsap.set(el, { opacity: 0 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => gsap.to(el, { opacity: 1, duration: 0.6 }),
          });
          return;
        }

        gsap.set(el, { opacity: 0, scale: 0.92, clipPath: "inset(0 100% 0 0)" });
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      createFadeReveal({ trigger: quoteRef, reducedMotion, start: "top 85%" });
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <SectionWrapper id="couple" className="bg-neutral-50">
      <ParticleLayer mood="celebration" id="couple-particles" />

      <div className="relative z-10 mx-auto max-w-5xl section-padding">
        <h2 className="mb-2 text-center font-display text-3xl text-gold-foil md:text-4xl">
          The Couple
        </h2>
        <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          <div ref={brideRef} className="glass-card overflow-hidden p-6 md:p-8">
            <div className="mb-6 flex justify-center">
              <Image
                src={couple.bride.portrait}
                alt={couple.bride.name}
                width={200}
                height={240}
                className="rounded-xl object-cover"
              />
            </div>
            <h3 className="mb-3 text-center font-script text-4xl text-gold-foil">
              {couple.bride.name}
            </h3>
            <p className="text-center font-body text-sm leading-relaxed text-primary-600 md:text-base">
              {couple.bride.bio}
            </p>
          </div>

          <div ref={groomRef} className="glass-card overflow-hidden p-6 md:p-8">
            <div className="mb-6 flex justify-center">
              <Image
                src={couple.groom.portrait}
                alt={couple.groom.name}
                width={200}
                height={240}
                className="rounded-xl object-cover"
              />
            </div>
            <h3 className="mb-3 text-center font-script text-4xl text-gold-foil">
              {couple.groom.name}
            </h3>
            <p className="text-center font-body text-sm leading-relaxed text-primary-600 md:text-base">
              {couple.groom.bio}
            </p>
          </div>
        </div>

        <div
          ref={quoteRef}
          className="mx-auto mt-16 max-w-xl rounded-2xl border border-secondary-300/50 bg-secondary-50/60 p-8 text-center"
        >
          <p className="font-display text-lg italic leading-relaxed text-primary-700 md:text-xl">
            &ldquo;{couple.howTheyMet}&rdquo;
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
