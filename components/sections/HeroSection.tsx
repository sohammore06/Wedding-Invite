"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { couple, media } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScroll } from "@/components/providers/SmoothScrollProvider";

const ParticleLayer = dynamic(
  () =>
    import("@/components/ambient/ParticleLayer").then((m) => m.ParticleLayer),
  { ssr: false }
);

type HeroSectionProps = {
  active?: boolean;
};

const easeRich = [0.16, 1, 0.3, 1] as const;

export function HeroSection({ active = false }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const { scrollTo } = useScroll();
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (!active) return;
    // Particles after flaps have started to clear — feels lively under the open
    const t = window.setTimeout(
      () => setShowParticles(true),
      reducedMotion ? 0 : 900
    );
    return () => window.clearTimeout(t);
  }, [active, reducedMotion]);

  return (
    <SectionWrapper id="hero" className="relative min-h-screen bg-champagne-gradient">
      {showParticles && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <ParticleLayer mood="day" id="hero-particles" />
        </motion.div>
      )}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-14 pb-12 text-center md:px-12 md:pt-24 md:pb-20">
        <motion.p
          className="mb-5 font-body text-xs tracking-[0.4em] text-primary-500 uppercase md:text-sm"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 1.1,
            delay: active ? (reducedMotion ? 0.1 : 0.85) : 0,
            ease: easeRich,
          }}
        >
          {couple.wedding.tagline}
        </motion.p>

        <motion.div
          className="relative mb-6 w-full max-w-sm md:max-w-md lg:max-w-lg"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: reducedMotion ? 0.4 : 1.6,
            delay: active ? (reducedMotion ? 0 : 0.55) : 0,
            ease: easeRich,
          }}
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              boxShadow:
                "0 24px 48px rgba(122, 46, 59, 0.12), 0 0 0 1px rgba(201, 162, 75, 0.25)",
            }}
          >
            <Image
              src={media.coupleIllustration}
              alt={`${couple.bride.name} and ${couple.groom.name} — wedding caricature`}
              width={900}
              height={1350}
              className="h-auto w-full object-cover"
              priority
              sizes="(max-width: 768px) 90vw, 480px"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "linear-gradient(to top, rgba(251, 243, 231, 0.95) 0%, transparent 100%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute -top-2 -left-2 h-8 w-8 rounded-tl-lg border-t-2 border-l-2 border-accent-400/60" />
          <div className="pointer-events-none absolute -top-2 -right-2 h-8 w-8 rounded-tr-lg border-t-2 border-r-2 border-accent-400/60" />
          <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-accent-400/60" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-accent-400/60" />
        </motion.div>

        <motion.h1
          className="font-script text-5xl leading-tight md:text-7xl lg:text-8xl"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 1.05,
            delay: active ? (reducedMotion ? 0.15 : 1.0) : 0,
            ease: easeRich,
          }}
        >
          <span className="text-gold-foil">{couple.bride.name}</span>
          <span className="mx-2 font-display text-2xl text-primary-600 md:mx-3 md:text-3xl">
            weds
          </span>
          <span className="text-gold-foil">{couple.groom.name}</span>
        </motion.h1>

        <motion.button
          type="button"
          onClick={() => scrollTo("#story")}
          className="mt-4 flex flex-col items-center gap-1.5"
          aria-label="Scroll to continue"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.8,
            delay: active ? (reducedMotion ? 0.2 : 1.2) : 0,
            ease: easeRich,
          }}
        >
          <span className="font-body text-[0.6rem] tracking-[0.42em] text-primary-600 uppercase">
            Scroll
          </span>
          <motion.span
            aria-hidden
            className="text-accent-600"
            animate={
              active && !reducedMotion
                ? { y: [0, 6, 0], opacity: [0.45, 1, 0.45] }
                : { y: 0, opacity: 0.9 }
            }
            transition={
              active && !reducedMotion
                ? {
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }
                : { duration: 0.2 }
            }
          >
            <ArrowDown strokeWidth={1.25} className="h-4 w-4" />
          </motion.span>
        </motion.button>

        <motion.div
          initial={false}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: active ? (reducedMotion ? 0.2 : 1.15) : 0,
          }}
        >
          <OrnamentalDivider className="my-6 w-full max-w-xs md:max-w-md" />
        </motion.div>

        <motion.div
          className="glass-card px-8 py-4"
          initial={false}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.95,
            delay: active ? (reducedMotion ? 0.25 : 1.3) : 0,
            ease: easeRich,
          }}
        >
          <p className="font-display text-2xl tracking-wide text-primary-700 md:text-3xl">
            {couple.wedding.date}
          </p>
          <p className="mt-1 font-body text-sm text-primary-500">
            {couple.wedding.year}
          </p>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
