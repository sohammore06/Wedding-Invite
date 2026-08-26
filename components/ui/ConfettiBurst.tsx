"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export function ConfettiBurst() {
  const [ready, setReady] = useState(false);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 60 },
        color: { value: ["#C9A24B", "#E8C4A0", "#F5E6A8", "#7A2E3B"] },
        shape: { type: ["circle", "square"] },
        opacity: { value: { min: 0.4, max: 1 } },
        size: { value: { min: 3, max: 8 } },
        move: {
          enable: true,
          speed: { min: 2, max: 6 },
          direction: "top",
          outModes: { default: "destroy" },
        },
        life: { duration: { value: 2 } },
      },
      detectRetina: true,
      emitters: {
        position: { x: 50, y: 100 },
        rate: { quantity: 20, delay: 0.1 },
        life: { duration: 0.5, count: 1 },
      },
    }),
    []
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Particles id="confetti-burst" options={options} className="h-full w-full" />
    </div>
  );
}
