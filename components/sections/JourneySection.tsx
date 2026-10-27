"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
import { media, journeyWaypoints } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MARKER_PROGRESS = journeyWaypoints.map((w) => w.scrollProgress);

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const pathDrawRef = useRef<SVGPathElement>(null);
  const pathAlignRef = useRef<SVGPathElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const markerOutersRef = useRef<(SVGGElement | null)[]>([]);
  const markerInnersRef = useRef<(SVGGElement | null)[]>([]);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const gateRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const car = carRef.current;
      const pathDraw = pathDrawRef.current;
      const pathAlign = pathAlignRef.current;
      if (!section || !car || !pathDraw || !pathAlign) return;

      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      const markerInners = markerInnersRef.current.filter(
        Boolean
      ) as SVGGElement[];
      const dots = dotsRef.current.filter(Boolean) as HTMLSpanElement[];

      const totalLen = pathAlign.getTotalLength();
      journeyWaypoints.forEach((wp, i) => {
        const pt = pathAlign.getPointAtLength(totalLen * wp.scrollProgress);
        const outer = markerOutersRef.current[i];
        if (outer) {
          outer.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        }
      });

      if (reducedMotion) {
        panels.forEach((panel) => gsap.set(panel, { opacity: 1, y: 0 }));
        gsap.set(car, {
          motionPath: {
            path: pathAlign,
            align: pathAlign,
            alignOrigin: [0.5, 0.7],
            autoRotate: true,
            start: 0.5,
            end: 0.5,
          },
        });
        gsap.set(pathDraw, { strokeDashoffset: 0 });
        if (gateRef.current) gsap.set(gateRef.current, { opacity: 1 });
        markerInners.forEach((m) => gsap.set(m, { opacity: 1, scale: 1 }));
        return;
      }

      gsap.set(pathDraw, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen,
      });

      gsap.set(panels, { opacity: 0, y: 14 });
      gsap.set(markerInners, {
        opacity: 0.4,
        scale: 0.8,
        transformOrigin: "50% 50%",
      });
      gsap.set(dots, {
        backgroundColor: "rgba(201,162,75,0.28)",
        scale: 1,
      });
      if (gateRef.current) {
        gsap.set(gateRef.current, { opacity: 0, scale: 0.9, y: 16 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          invalidateOnRefresh: true,
          // Clear the previous path transform before MotionPath measures again.
          // Otherwise the align bakes in the car's current x/y and it sits off the road.
          onRefreshInit: () => {
            gsap.set(car, { x: 0, y: 0, rotation: 0 });
          },
        },
      });

      tl.to(pathDraw, { strokeDashoffset: 0, duration: 1 }, 0);

      tl.to(
        car,
        {
          motionPath: {
            path: pathAlign,
            align: pathAlign,
            alignOrigin: [0.5, 0.72],
            autoRotate: true,
            start: 0,
            end: 1,
          },
          // Render the path start immediately, and again after each refresh,
          // so the car is on the road before the scrub moves it.
          immediateRender: true,
          duration: 1,
        },
        0
      );

      tl.progress(0);

      let lastActive = -1;
      const setActive = (index: number) => {
        if (index === lastActive) return;
        lastActive = index;

        panels.forEach((panel, i) => {
          const on = i === index;
          gsap.to(panel, {
            opacity: on ? 1 : 0,
            y: on ? 0 : 10,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        markerInners.forEach((marker, i) => {
          const reached = i <= index;
          const current = i === index;
          gsap.to(marker, {
            opacity: reached ? 1 : 0.4,
            scale: current ? 1.2 : reached ? 1 : 0.8,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        dots.forEach((dot, i) => {
          gsap.to(dot, {
            backgroundColor:
              i === index
                ? "#c9a24b"
                : i < index
                  ? "rgba(122,46,59,0.5)"
                  : "rgba(201,162,75,0.28)",
            scale: i === index ? 1.35 : 1,
            duration: 0.3,
            overwrite: "auto",
          });
        });

        if (gateRef.current) {
          const show = index >= journeyWaypoints.length - 1;
          gsap.to(gateRef.current, {
            opacity: show ? 1 : 0,
            scale: show ? 1 : 0.9,
            y: show ? 0 : 16,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      setActive(0);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          let active = 0;
          MARKER_PROGRESS.forEach((threshold, i) => {
            if (p >= threshold - 0.05) active = i;
          });
          setActive(active);
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <SectionWrapper
      ref={sectionRef}
      id="journey"
      clipOverflow={false}
      showMotifs={false}
      className="relative h-[270vh] bg-secondary-50"
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden">
        <ParticleLayer mood="day" id="journey-particles" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{ backgroundImage: "var(--texture-paper)" }}
          aria-hidden
        />

        <div className="relative z-20 shrink-0 px-6 pt-10 pb-1 text-center md:pt-12">
          <p className="mb-2 font-body text-[0.65rem] tracking-[0.35em] text-primary-400 uppercase">
            Along the way
          </p>
          <h2 className="font-display text-3xl text-gold-foil md:text-4xl">
            The Journey
          </h2>
          <p className="mt-2 font-body text-sm text-primary-500">
            Scroll to travel with us
          </p>
          <OrnamentalDivider className="mx-auto mt-4 w-full max-w-[11rem]" />
        </div>

        <div className="relative z-20 mx-auto h-[7.25rem] w-full max-w-lg shrink-0 px-6 md:h-[8rem]">
          {journeyWaypoints.map((waypoint, index) => (
            <div
              key={waypoint.id}
              ref={(el) => {
                panelsRef.current[index] = el;
              }}
              className="absolute inset-x-6 top-0 text-center md:inset-x-8"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="inline-block h-px w-5 bg-accent-400/70" />
                <span className="font-body text-[0.65rem] tracking-[0.28em] text-accent-600 uppercase">
                  {waypoint.label}
                </span>
                <span className="inline-block h-px w-5 bg-accent-400/70" />
              </div>
              <p className="font-display text-xl leading-snug text-primary-700 md:text-2xl">
                {waypoint.value}
              </p>
              <p className="mx-auto mt-2 max-w-sm font-body text-xs leading-relaxed text-primary-500 md:text-sm">
                {waypoint.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="relative z-10 min-h-0 w-full flex-1">
          <svg
            viewBox="0 0 360 640"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient
                id="journey-road-gold"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e8c872" stopOpacity="0.2" />
                <stop offset="45%" stopColor="#c9a24b" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7a2e3b" stopOpacity="0.65" />
              </linearGradient>
            </defs>

            {/* Soft road bed — always visible */}
            <path
              d={media.journey.roadPath}
              fill="none"
              stroke="rgba(232,196,160,0.5)"
              strokeWidth="26"
              strokeLinecap="round"
            />

            {/* Align path (invisible) for MotionPath + markers */}
            <path
              ref={pathAlignRef}
              d={media.journey.roadPath}
              fill="none"
              stroke="transparent"
              strokeWidth="2"
            />

            {/* Gold trail draws as you scroll */}
            <path
              ref={pathDrawRef}
              d={media.journey.roadPath}
              fill="none"
              stroke="url(#journey-road-gold)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Subtle dashed guide */}
            <path
              d={media.journey.roadPath}
              fill="none"
              stroke="rgba(80,64,48,0.28)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="7 11"
            />

            {journeyWaypoints.map((waypoint, index) => (
              <g
                key={waypoint.id}
                ref={(el) => {
                  markerOutersRef.current[index] = el;
                }}
              >
                <g
                  ref={(el) => {
                    markerInnersRef.current[index] = el;
                  }}
                >
                  <circle
                    r="15"
                    fill="#fbf3e7"
                    stroke="#c9a24b"
                    strokeWidth="1.6"
                  />
                  <circle r="4.5" fill="#7a2e3b" />
                  <text
                    y="30"
                    textAnchor="middle"
                    fill="#662733"
                    fontSize="9"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    letterSpacing="0.08em"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </text>
                </g>
              </g>
            ))}
          </svg>

          <div
            ref={carRef}
            className="absolute top-0 left-0 z-20 will-change-transform"
            style={{ width: 76, height: 46 }}
          >
            {/* Mirror art so nose matches travel direction without flipping upside-down */}
            <div className="-scale-x-100">
              <Image
                src={`${media.journey.car}?v=2`}
                alt=""
                width={76}
                height={46}
                className="drop-shadow-[0_10px_18px_rgba(122,46,59,0.28)]"
                unoptimized
              />
            </div>
          </div>

          <div
            ref={gateRef}
            className="pointer-events-none absolute right-[5%] bottom-[3%] z-10 md:right-[14%] md:bottom-[5%]"
          >
            <Image
              src={`${media.journey.venueGate}?v=2`}
              alt=""
              width={112}
              height={98}
              className="opacity-95"
              unoptimized
            />
          </div>
        </div>

        <div
          className="relative z-20 flex shrink-0 items-center justify-center gap-3 pt-1 pb-7"
          aria-hidden
        >
          {journeyWaypoints.map((waypoint, index) => (
            <span
              key={waypoint.id}
              ref={(el) => {
                dotsRef.current[index] = el;
              }}
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-400/30"
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
