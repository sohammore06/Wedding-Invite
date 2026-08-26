"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { media } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";
import { createFadeReveal } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GallerySection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const images = media.gallery;

  useGSAP(
    () => {
      createFadeReveal({ trigger: headingRef, reducedMotion });
    },
    { dependencies: [reducedMotion] }
  );

  if (images.length === 0) {
    return (
      <SectionWrapper id="gallery" className="bg-champagne-gradient">
        <ParticleLayer mood="celebration" id="gallery-particles" />
        <div className="relative z-10 mx-auto max-w-4xl section-padding text-center">
          <div ref={headingRef}>
            <h2 className="mb-2 font-display text-3xl text-gold-foil md:text-4xl">
              Our Moments
            </h2>
            <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-secondary-300 bg-neutral-50/50 py-20">
            <div className="mb-4 font-script text-6xl text-accent-300/50">📷</div>
            <p className="font-display text-lg text-primary-400">
              Beautiful memories coming soon
            </p>
            <p className="mt-2 font-body text-sm text-primary-300">
              Add photos to content/media.ts → gallery
            </p>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  const gridClass =
    images.length <= 3
      ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      : images.length <= 6
        ? "columns-2 gap-4 md:columns-3"
        : "columns-2 gap-3 md:columns-3 lg:columns-4";

  return (
    <SectionWrapper id="gallery" className="bg-champagne-gradient">
      <ParticleLayer mood="celebration" id="gallery-particles" />

      <div className="relative z-10 mx-auto max-w-5xl section-padding">
        <div ref={headingRef} className="text-center">
          <h2 className="mb-2 font-display text-3xl text-gold-foil md:text-4xl">
            Our Moments
          </h2>
          <OrnamentalDivider className="mx-auto mb-12 w-full max-w-xs" />
        </div>

        <div className={gridClass}>
          {images.map((src, index) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={`mb-4 block w-full overflow-hidden rounded-xl ${
                images.length > 6 ? "break-inside-avoid" : ""
              }`}
              whileHover={reducedMotion ? {} : { scale: 1.02 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              <Image
                src={src}
                alt={`Gallery photo ${index + 1}`}
                width={600}
                height={images.length > 6 ? 400 + (index % 3) * 100 : 400}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-900/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 rounded-full bg-neutral-100/10 p-2"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6 text-neutral-100" />
            </button>
            <motion.div
              layoutId={`gallery-${lightboxIndex}`}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Gallery photo ${lightboxIndex + 1}`}
                width={1200}
                height={800}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
