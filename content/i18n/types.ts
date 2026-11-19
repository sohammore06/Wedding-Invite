import type { EventId } from "../events";

export type Locale = "en" | "mr";

export type EventText = {
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  description?: string;
};

export type Dictionary = {
  couple: {
    bride: { name: string; bio: string };
    groom: { name: string; bio: string };
    wedding: { date: string; dateFull: string; year: string; tagline: string };
    welcomeNote: { greeting: string; body: string[]; closing: string };
    howTheyMet: string;
    signOff: { message: string; names: string; family: string };
  };
  seo: { title: string; description: string };
  events: Record<EventId, EventText>;
  venue: { name: string; shortName: string; address: string; city: string };
  ui: {
    envelopeCta: string;
    envelopeAria: string;
    waxSealAlt: string;
    heroPhotoAlt: (bride: string, groom: string) => string;
    weds: string;
    scroll: string;
    scrollAria: string;
    countdownLabel: string;
    countdownUnits: { days: string; hours: string; minutes: string; seconds: string };
    countdownAria: (days: string, hours: string, minutes: string, seconds: string) => string;
    countdownDone: string;
    countdownDoneNote: string;
    coupleHeading: string;
    portraitAlt: (name: string) => string;
    eventsHeading: string;
    eventsSubheading: string;
    venueHeading: string;
    getDirections: string;
    mapTitle: (venueName: string) => string;
    mapPlaceholder: string;
    monogramAlt: (bride: string, groom: string) => string;
    shareInvitation: string;
    linkCopied: string;
    musicStart: string;
    musicUnmute: string;
    musicMute: string;
    backToTop: string;
  };
};
