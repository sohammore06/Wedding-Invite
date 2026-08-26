import { couple } from "./couple";
import { venue } from "./venue";

export const journeyWaypoints = [
  {
    id: "date",
    label: "Save the Date",
    value: couple.wedding.dateFull,
    detail: "Mark your calendars — we can’t wait to celebrate with you.",
    icon: "date" as const,
    scrollProgress: 0.22,
  },
  {
    id: "venue",
    label: "The Venue",
    value: venue.name,
    detail: "Where two families gather under one mandap of blessings.",
    icon: "venue" as const,
    scrollProgress: 0.52,
  },
  {
    id: "location",
    label: "The City",
    value: venue.city,
    detail: "Come home to warm hospitality on the Nira–Baramati highway.",
    icon: "location" as const,
    scrollProgress: 0.82,
  },
] as const;
