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
  { id: "engagement", icon: "/media/icons/reception.svg", order: 1 },
  { id: "ganesh-sthapana", icon: "/media/icons/ganesh.svg", order: 2 },
  { id: "pithi", icon: "/media/icons/haldi.svg", order: 3 },
  { id: "sangeet-garba", icon: "/media/icons/garba.svg", order: 4 },
  { id: "grah-shanti", icon: "/media/icons/jain.svg", order: 5 },
  { id: "lagna-vidhi", icon: "/media/icons/wedding.svg", order: 6, isHero: true },
] as const;

export type EventId = (typeof eventDetails)[number]["id"];

export function buildEvents(t: Dictionary): WeddingEvent[] {
  return eventDetails.map((event) => ({ ...event, ...t.events[event.id] }));
}

export const events = buildEvents(en);
