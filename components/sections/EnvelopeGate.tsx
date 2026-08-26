"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { media } from "@/content";
import { useAudio } from "@/components/providers/AudioProvider";
import { useScroll } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type EnvelopeGateProps = {
  /** Fires when flaps begin opening — activate hero underneath */
  onOpenStart: () => void;
  /** Fires after flaps have fully cleared — unmount the gate */
  onOpenComplete: () => void;
};

const easeOpen = [0.22, 1, 0.36, 1] as const;

/** True triangle flaps — tip toward center (matches classic envelope) */
const FLAP_CLIP = {
  top: "polygon(0% 0%, 100% 0%, 50% 100%)",
  bottom: "polygon(50% 0%, 100% 100%, 0% 100%)",
  left: "polygon(0% 0%, 100% 50%, 0% 100%)",
  right: "polygon(100% 0%, 100% 100%, 0% 50%)",
} as const;

export function EnvelopeGate({ onOpenStart, onOpenComplete }: EnvelopeGateProps) {
  const [phase, setPhase] = useState<"closed" | "opening">("closed");
  const { startMusic } = useAudio();
  const { unlockScroll } = useScroll();
  const reducedMotion = useReducedMotion();

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;

    startMusic();
    setPhase("opening");

    onOpenStart();
    unlockScroll();

    const finishMs = reducedMotion ? 800 : 4800;
    window.setTimeout(() => onOpenComplete(), finishMs);
  }, [phase, startMusic, unlockScroll, onOpenStart, onOpenComplete, reducedMotion]);

  const isOpening = phase === "opening";
  const flapDuration = reducedMotion ? 0.45 : 3.6;
  const flapDelay = reducedMotion ? 0.05 : 0.65;

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden bg-transparent"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 z-10 bg-[#fbf3e7]"
        animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0.2 : 0.7,
          delay: isOpening ? flapDelay : 0,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Top — triangle tip down */}
        <motion.div
          className="absolute top-0 left-0 h-[52%] w-full will-change-transform"
          style={{ clipPath: FLAP_CLIP.top }}
          animate={isOpening ? { y: "-110%" } : { y: "0%" }}
          transition={{ duration: flapDuration, delay: flapDelay, ease: easeOpen }}
        >
          <Image
            src={media.envelope.flaps.top}
            alt=""
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
        </motion.div>

        {/* Bottom — triangle tip up */}
        <motion.div
          className="absolute bottom-0 left-0 h-[52%] w-full will-change-transform"
          style={{ clipPath: FLAP_CLIP.bottom }}
          animate={isOpening ? { y: "110%" } : { y: "0%" }}
          transition={{
            duration: flapDuration,
            delay: flapDelay + 0.08,
            ease: easeOpen,
          }}
        >
          <Image
            src={media.envelope.flaps.bottom}
            alt=""
            fill
            className="object-cover object-bottom"
            priority
            unoptimized
          />
        </motion.div>

        {/* Left — triangle tip right */}
        <motion.div
          className="absolute top-0 left-0 h-full w-[52%] will-change-transform"
          style={{ clipPath: FLAP_CLIP.left }}
          animate={isOpening ? { x: "-110%" } : { x: "0%" }}
          transition={{
            duration: flapDuration,
            delay: flapDelay + 0.12,
            ease: easeOpen,
          }}
        >
          <Image
            src={media.envelope.flaps.left}
            alt=""
            fill
            className="object-cover object-left"
            priority
            unoptimized
          />
        </motion.div>

        {/* Right — triangle tip left */}
        <motion.div
          className="absolute top-0 right-0 h-full w-[52%] will-change-transform"
          style={{ clipPath: FLAP_CLIP.right }}
          animate={isOpening ? { x: "110%" } : { x: "0%" }}
          transition={{
            duration: flapDuration,
            delay: flapDelay + 0.16,
            ease: easeOpen,
          }}
        >
          <Image
            src={media.envelope.flaps.right}
            alt=""
            fill
            className="object-cover object-right"
            priority
            unoptimized
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          animate={isOpening ? { opacity: 0 } : { opacity: 0.22 }}
          transition={{ duration: 0.55, delay: flapDelay }}
        >
          <div
            className="absolute top-1/2 left-1/2 h-[70vmax] w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #7a2e3b, transparent)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-[70vmax] w-[2px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #7a2e3b, transparent)",
            }}
          />
        </motion.div>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        disabled={isOpening}
        className="absolute inset-0 z-30 flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent outline-none"
        aria-label="Click to open invitation"
        suppressHydrationWarning
      >
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              key="seal-group"
              className="relative flex flex-col items-center"
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: easeOpen }}
            >
              <motion.div
                className="relative h-[108px] w-[108px] md:h-[132px] md:w-[132px]"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={media.envelope.waxSeal}
                  alt="Wax seal"
                  width={132}
                  height={132}
                  className="h-full w-full object-contain drop-shadow-[0_10px_24px_rgba(90,60,20,0.35)]"
                  priority
                  unoptimized
                />
              </motion.div>

              <motion.p
                className="mt-6 font-display text-base tracking-[0.18em] text-primary-600 md:text-lg"
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                Click to open
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
