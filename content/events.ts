import type { Dictionary } from "./i18n/types";
import { en } from "./i18n/en";

export type WeddingEvent = {
  id: string;
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  description?: string;
  icon: string;
  order: number;
  isHero?: boolean;
};

const eventDetails = [
  { id: "lagna-vidhi", icon: "/media/icons/wedding.svg", order: 1, isHero: true },
] as const;

export type EventId = (typeof eventDetails)[number]["id"];

export function buildEvents(t: Dictionary): WeddingEvent[] {
  return eventDetails.map((event) => ({ ...event, ...t.events[event.id] }));
}

export const events = buildEvents(en);
