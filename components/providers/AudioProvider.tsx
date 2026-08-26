"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  hasBackgroundMusicStarted,
  setMusicListeners,
  startBackgroundMusic,
  toggleBackgroundMusicMute,
} from "@/lib/backgroundMusic";

type AudioContextValue = {
  isPlaying: boolean;
  isMuted: boolean;
  hasStarted: boolean;
  toggleMute: () => void;
  startMusic: () => boolean;
  playSfx: (key: "envelopeOpen") => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    setMusicListeners({
      onPlay: () => {
        setIsPlaying(true);
        setHasStarted(true);
      },
      onPause: () => setIsPlaying(false),
      onStop: () => setIsPlaying(false),
    });
  }, []);

  const startMusic = useCallback(() => startBackgroundMusic(), []);

  const toggleMute = useCallback(() => {
    if (!hasBackgroundMusicStarted()) {
      setIsMuted(false);
      startMusic();
      return;
    }

    const muted = toggleBackgroundMusicMute();
    setIsMuted(muted);
  }, [startMusic]);

  const playSfx = useCallback(() => {
    // Reserved for optional envelope SFX — no-op to avoid interrupting bg music
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        hasStarted,
        toggleMute,
        startMusic,
        playSfx,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
