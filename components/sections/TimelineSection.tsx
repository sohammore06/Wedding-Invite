"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { events } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const sortedEvents = [...events].sort((a, b) => a.order - b.order);

  useGSAP(
    () => {
      const line = lineRef.current;
      const section = sectionRef.current;
      const container = timelineContainerRef.current;
      if (!line || !section || !container) return;

      if (reducedMotion) {
        gsap.set(line, { scaleY: 1 });
        return;
      }

      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <SectionWrapper ref={sectionRef} id="timeline" className="bg-champagne-gradient">
      <ParticleLayer mood="celebration" id="timeline-particles" />

      <div className="relative z-10 mx-auto max-w-3xl section-padding">
        <h2 className="mb-2 text-center font-display text-3xl text-gold-foil md:text-4xl">
          Wedding Events
        </h2>
        <p className="mb-4 text-center font-body text-sm text-primary-500">
          Celebrations across our sacred days
        </p>
        <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />

        <div className="relative" ref={timelineContainerRef}>
          <div
            ref={lineRef}
            className="absolute top-0 left-[23px] h-full w-0.5 origin-top bg-gold-foil md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-12">
            {sortedEvents.map((event, index) => (
              <TimelineEventCard
                key={event.id}
                event={event}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TimelineEventCard({
  event,
  index,
  reducedMotion,
}: {
  event: (typeof events)[number];
  index: number;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = cardRef.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => gsap.to(el, { opacity: 1, duration: 0.5 }),
        });
        return;
      }

      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { dependencies: [reducedMotion] }
  );

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative flex ${
        isEven ? "md:justify-start" : "md:justify-end"
      } pl-12 md:pl-0`}
    >
      <div
        className={`glass-card w-full p-5 md:w-[calc(50%-2rem)] ${
          event.isHero
            ? "border-accent-400/60 ring-1 ring-accent-300/30 md:scale-105"
            : ""
        }`}
      >
        <div className="mb-3 flex items-center gap-3">
          <Image src={event.icon} alt="" width={28} height={28} />
          <h3
            className={`font-display text-primary-800 ${
              event.isHero ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {event.title}
          </h3>
        </div>

        {event.date && (
          <p className="font-body text-sm font-medium text-accent-700">
            {event.date}
            {event.time ? ` · ${event.time}` : ""}
          </p>
        )}
        {event.venue && (
          <p className="mt-1 font-body text-sm text-primary-600">{event.venue}</p>
        )}
        {event.description && (
          <p className="mt-3 font-body text-sm leading-relaxed text-primary-500">
            {event.description}
          </p>
        )}
      </div>

      <div className="absolute top-6 left-4 h-3 w-3 rounded-full border-2 border-accent-500 bg-neutral-100 md:left-1/2 md:-translate-x-1/2" />
    </div>
  );
}
