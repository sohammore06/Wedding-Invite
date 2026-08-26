"use client";

import { motion } from "framer-motion";
import { couple } from "@/content";
import { useAudio } from "@/components/providers/AudioProvider";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { startMusic } = useAudio();

  const handleEnter = () => {
    startMusic();
    onComplete();
  };

  return (
    <motion.button
      type="button"
      onClick={handleEnter}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center border-0 bg-neutral-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      aria-label="Tap to open your invitation"
    >
      <motion.div
        className="relative flex h-28 w-28 items-center justify-center"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full border border-accent-400/30" />
        <div className="absolute inset-2 rounded-full border border-accent-500/50" />
        <span className="font-script text-5xl text-gold-foil">
          {couple.bride.name.charAt(0)} ❤ {couple.groom.name.charAt(0)}
        </span>
      </motion.div>
      <motion.p
        className="mt-8 font-display text-sm tracking-[0.3em] text-primary-600 uppercase"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to open your invitation
      </motion.p>
    </motion.button>
  );
}
