import type { Dictionary } from "./i18n/types";
import { en } from "./i18n/en";

export function buildVenue(t: Dictionary) {
  return {
    ...t.venue,
    /** Google Maps embed searches in English so the pin always resolves */
    mapsQuery: `${en.venue.name}, ${en.venue.address}`,
    mapsUrl: "https://maps.app.goo.gl/G8TCAVqNphFgAJwq8",
    /** Place coordinates from Google Maps */
    lat: 18.1090143,
    lng: 74.2427205,
    phone: "+91 82331 33104",
    website: "https://samataroyalpalace.com/",
    photos: [] as string[],
    galleryPlaceholder: "/media/venue-placeholder.svg",
  };
}

export const venue = buildVenue(en);
