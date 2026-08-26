"use client";

import { useState } from "react";
import Image from "next/image";
import { Share2, Check } from "lucide-react";
import { couple, media } from "@/content";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { ParticleLayer } from "@/components/ambient/ParticleLayer";

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = couple.seo.siteUrl;
    try {
      if (navigator.share) {
        await navigator.share({
          title: couple.seo.title,
          text: couple.seo.description,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <SectionWrapper id="footer" className="bg-primary-800 text-neutral-100" showMotifs={false}>
      <ParticleLayer mood="night" id="footer-particles" />

      <div className="relative z-10 mx-auto max-w-2xl section-padding text-center">
        <div className="mx-auto mb-10 flex justify-center">
          <Image
            src={media.motifs.monogram}
            alt={`${couple.bride.name} & ${couple.groom.name} monogram`}
            width={148}
            height={148}
            className="h-[7.25rem] w-[7.25rem] object-contain drop-shadow-[0_0_24px_rgba(201,162,75,0.22)] md:h-36 md:w-36"
            unoptimized
            priority={false}
          />
        </div>

        <p className="font-body text-sm tracking-widest text-secondary-300 uppercase">
          {couple.signOff.message}
        </p>
        <h2 className="mt-4 font-script text-5xl text-gold-foil md:text-6xl">
          {couple.signOff.names}
        </h2>
        <p className="mt-3 font-body text-sm text-secondary-400">
          {couple.signOff.family}
        </p>

        <OrnamentalDivider className="my-10 opacity-40" />

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-accent-500/40 px-6 py-2.5 font-body text-sm text-secondary-200 transition-colors hover:border-accent-400 hover:text-neutral-50"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Link Copied
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              Share Invitation
            </>
          )}
        </button>

        <p className="mt-12 font-body text-xs text-primary-400/60">
          {/* Made with love */}
        </p>
      </div>
    </SectionWrapper>
  );
}
