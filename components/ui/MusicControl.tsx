"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/components/providers/AudioProvider";

export function MusicControl() {
  const { isMuted, isPlaying, hasStarted, toggleMute, startMusic } = useAudio();

  const handleClick = () => {
    if (!hasStarted) {
      startMusic();
      return;
    }
    toggleMute();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="fixed top-5 right-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-accent-400/40 bg-neutral-50/90 shadow-lg backdrop-blur-sm transition-colors hover:border-accent-500"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      aria-label={!hasStarted ? "Tap to start music" : isMuted ? "Unmute music" : "Mute music"}
    >
      {!hasStarted || isMuted ? (
        <VolumeX className="h-5 w-5 text-primary-600" />
      ) : isPlaying ? (
        <div className="flex items-end gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-0.5 rounded-full bg-accent-500"
              animate={{ height: [4, 12, 6, 10, 4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      ) : (
        <Volume2 className="h-5 w-5 text-accent-600" />
      )}
    </motion.button>
  );
}
