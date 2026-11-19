import { buildCouple } from "./couple";
import { buildEvents } from "./events";
import { buildVenue } from "./venue";
import { en } from "./i18n/en";
import { mr } from "./i18n/mr";
import type { Dictionary, Locale } from "./i18n/types";

export { couple, SITE_URL } from "./couple";
export { events, type WeddingEvent, type EventId } from "./events";
export { venue } from "./venue";
export { media } from "./media";
export { theme, type SectionMood, type Theme } from "./theme";
export type { Dictionary, Locale } from "./i18n/types";

/** URL path for each language, relative to the site root */
export const localePaths: Record<Locale, string> = { en: "", mr: "mr" };

function buildContent(t: Dictionary, locale: Locale) {
  return {
    locale,
    couple: buildCouple(t, localePaths[locale]),
    events: buildEvents(t),
    venue: buildVenue(t),
    ui: t.ui,
  };
}

export type SiteContent = ReturnType<typeof buildContent>;

const contentByLocale: Record<Locale, SiteContent> = {
  en: buildContent(en, "en"),
  mr: buildContent(mr, "mr"),
};

export function getContent(locale: Locale): SiteContent {
  return contentByLocale[locale];
}
