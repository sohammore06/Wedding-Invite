"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { BackToTop } from "@/components/ui/BackToTop";
import { EnvelopeGate } from "@/components/sections/EnvelopeGate";
import { HeroSection } from "@/components/sections/HeroSection";
import { StorySection } from "@/components/sections/StorySection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { useScroll } from "@/components/providers/SmoothScrollProvider";
import { MusicControl } from "@/components/ui/MusicControl";
import { media } from "@/content";

const JourneySection = dynamic(
  () =>
    import("@/components/sections/JourneySection").then((m) => m.JourneySection),
  { ssr: false }
);

const AmbientLifeLayer = dynamic(
  () =>
    import("@/components/ambient/AmbientLifeLayer").then(
      (m) => m.AmbientLifeLayer
    ),
  { ssr: false }
);

type AppPhase = "envelope" | "opening" | "main";

export default function HomePage() {
  const [phase, setPhase] = useState<AppPhase>("envelope");
  const [extrasReady, setExtrasReady] = useState(false);
  const { isScrollLocked } = useScroll();

  // Warm the caricature cache on first paint
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = media.coupleIllustration;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, []);

  useEffect(() => {
    if (phase !== "main") return;
    const t = window.setTimeout(() => setExtrasReady(true), 400);
    return () => window.clearTimeout(t);
  }, [phase]);

  const heroActive = phase === "opening" || phase === "main";
  const showEnvelope = phase === "envelope" || phase === "opening";

  return (
    <>
      <AnimatePresence>
        {showEnvelope && (
          <EnvelopeGate
            key="envelope"
            onOpenStart={() => setPhase("opening")}
            onOpenComplete={() => setPhase("main")}
          />
        )}
      </AnimatePresence>

      <main
        className={`relative ${isScrollLocked && phase === "envelope" ? "h-screen overflow-hidden" : ""}`}
        aria-hidden={phase === "envelope"}
      >
        <HeroSection active={heroActive} />
        <StorySection />
        <JourneySection />
        <CoupleSection />
        <TimelineSection />
        <VenueSection />
        <FooterSection />
      </main>

      {phase === "main" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <MusicControl />
          <ScrollProgressBar />
          <BackToTop />
        </motion.div>
      )}

      {extrasReady && <AmbientLifeLayer />}
    </>
  );
}
