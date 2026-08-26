"use client";

import { forwardRef, type ReactNode } from "react";
import { CornerMotif } from "./CornerMotif";
import type { SectionMood } from "@/content";

type SectionWrapperProps = {
  id: string;
  children: ReactNode;
  className?: string;
  mood?: SectionMood;
  showMotifs?: boolean;
  /** When false, allows position:sticky children to pin to the viewport */
  clipOverflow?: boolean;
};

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  function SectionWrapper(
    { id, children, className = "", showMotifs = true, clipOverflow = true },
    ref
  ) {
    return (
      <section
        ref={ref}
        id={id}
        data-section={id}
        className={`relative ${clipOverflow ? "overflow-hidden" : "overflow-visible"} ${className}`}
      >
        {showMotifs && (
          <>
            <CornerMotif position="top-left" />
            <CornerMotif position="top-right" />
            <CornerMotif position="bottom-left" />
            <CornerMotif position="bottom-right" />
          </>
        )}
        {children}
      </section>
    );
  }
);
