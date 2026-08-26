"use client";

import { type ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { AudioProvider } from "./AudioProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <AudioProvider>{children}</AudioProvider>
    </SmoothScrollProvider>
  );
}
