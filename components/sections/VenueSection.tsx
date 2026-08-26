"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, ExternalLink } from "lucide-react";
import { venue } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { createFadeReveal } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function VenueSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      createFadeReveal({ trigger: contentRef, reducedMotion });

      const mapEl = mapContainerRef.current;
      if (!mapEl) return;

      ScrollTrigger.create({
        trigger: mapEl,
        start: "top 85%",
        onEnter: () => setMapLoaded(true),
        once: true,
      });
    },
    { dependencies: [reducedMotion] }
  );

  return (
    <SectionWrapper id="venue" className="bg-neutral-50">
      <ParticleLayer mood="day" id="venue-particles" />

      <div className="relative z-10 mx-auto max-w-4xl section-padding">
        <h2 className="mb-2 text-center font-display text-3xl text-gold-foil md:text-4xl">
          Venue
        </h2>
        <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />

        <div ref={contentRef} className="glass-card mb-10 p-8 text-center">
          <MapPin className="mx-auto mb-4 h-8 w-8 text-accent-500" />
          <h3 className="font-display text-2xl text-primary-800">{venue.name}</h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-primary-600 md:text-base">
            {venue.address}
          </p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-royal mt-6 inline-flex gap-2"
          >
            Get Directions
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div
          ref={mapContainerRef}
          className="overflow-hidden rounded-2xl border border-secondary-300/40"
        >
          {mapLoaded ? (
            <iframe
              title={`Map to ${venue.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${venue.name}, ${venue.address}`
              )}&ll=${venue.lat},${venue.lng}&z=16&output=embed`}
              className="h-64 w-full md:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-secondary-100 md:h-80">
              <p className="font-body text-sm text-primary-400">
                Map loads as you scroll near
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
