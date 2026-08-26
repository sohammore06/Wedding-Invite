"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import type { SectionMood } from "@/content";

const moodConfigs: Record<SectionMood, ISourceOptions> = {
  day: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 25, density: { enable: true, width: 800, height: 800 } },
      color: { value: ["#F5E6D3", "#E8C4A0", "#FFFFFF", "#F0D4D9"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.2, max: 0.6 } },
      size: { value: { min: 2, max: 6 } },
      move: {
        enable: true,
        speed: { min: 0.5, max: 1.5 },
        direction: "bottom",
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  },
  celebration: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 35, density: { enable: true, width: 800, height: 800 } },
      color: { value: ["#C9A24B", "#F5E6A8", "#E8C4A0", "#FFFFFF"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: { min: 0.8, max: 2 },
        direction: "bottom-right",
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  },
  night: {
    fullScreen: { enable: false },
    particles: {
      number: { value: 20, density: { enable: true, width: 800, height: 800 } },
      color: { value: ["#C9A24B", "#F5E6A8", "#DFBD63"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.4, max: 0.9 } },
      size: { value: { min: 1, max: 3 } },
      move: {
        enable: true,
        speed: { min: 0.3, max: 0.8 },
        direction: "none",
        random: true,
        outModes: { default: "out" },
      },
    },
    detectRetina: true,
  },
};

type ParticleLayerProps = {
  mood?: SectionMood;
  className?: string;
  id?: string;
};

export function ParticleLayer({
  mood = "day",
  className = "",
  id = "particles",
}: ParticleLayerProps) {
  const [ready, setReady] = useState(false);
  const options = useMemo(() => moodConfigs[mood], [mood]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      <Particles id={id} options={options} className="h-full w-full" />
    </div>
  );
}
