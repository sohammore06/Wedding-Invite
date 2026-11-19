import type { Dictionary } from "./i18n/types";
import { en } from "./i18n/en";

export const SITE_URL = "https://www.shrutiwedsaditya.life/";

export function buildCouple(t: Dictionary, path = "") {
  return {
    bride: {
      ...t.couple.bride,
      fullName: t.couple.bride.name,
      portrait: "/media/shruti-photo.webp",
    },
    groom: {
      ...t.couple.groom,
      fullName: t.couple.groom.name,
      portrait: "/media/aditya-photo.webp",
    },
    wedding: {
      ...t.couple.wedding,
      /** Ceremony start — countdown target (IST) */
      ceremonyAt: "2026-11-30T12:31:00+05:30",
    },
    welcomeNote: t.couple.welcomeNote,
    howTheyMet: t.couple.howTheyMet,
    signOff: t.couple.signOff,
    seo: {
      ...t.seo,
      ogImage: "/media/og-image.jpg",
      siteUrl: `${SITE_URL}${path}`,
    },
  };
}

export const couple = buildCouple(en);
