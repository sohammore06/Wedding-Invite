"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getContent, type Locale, type SiteContent } from "@/content";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useContent(): SiteContent {
  return getContent(useContext(LocaleContext));
}
