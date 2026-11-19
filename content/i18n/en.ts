import type { Dictionary } from "./types";

export const en: Dictionary = {
  couple: {
    bride: {
      name: "Shruti",
      bio: "A soul who finds joy in quiet mornings, family gatherings, and the simple beauty of traditions passed down through generations. She believes love is found in the little things: a shared laugh, a warm cup of chai, a hand held through every season.",
    },
    groom: {
      name: "Aditya",
      bio: "Grounded in values, guided by kindness, and always ready with a smile that lights up every room. He cherishes the bonds of family and dreams of building a home filled with laughter, gratitude, and endless adventures together.",
    },
    wedding: {
      date: "30th November",
      dateFull: "Monday, 30th November 2026",
      year: "2026",
      tagline: "Two hearts, one sacred promise",
    },
    welcomeNote: {
      greeting: "With hearts full of gratitude and joy",
      body: [
        "Dear beloved family and friends,",
        "With the blessings of our elders and the grace of the divine, we invite you to witness and celebrate the sacred union of our hearts.",
        "Your presence has always been a gift in our lives. To have you stand beside us on this most cherished day would mean the world to us. For a wedding is not merely a ceremony, but a gathering of souls who have shaped who we are.",
        "We look forward to sharing this journey of love, laughter, and new beginnings with you.",
      ],
      closing: "With warmth and anticipation,",
    },
    howTheyMet:
      "Some love stories begin with a glance; ours began with a conversation that never seemed to end. Through seasons of friendship and moments of quiet understanding, we discovered that the best journeys are those walked together, hand in hand, heart in heart.",
    signOff: {
      message: "With love and blessings,",
      names: "Shruti & Aditya",
      family: "The Doshi & Gujar Families",
    },
  },
  seo: {
    title: "Shruti & Aditya | Wedding Invitation",
    description: "",
  },
  events: {
    engagement: {
      title: "Engagement Ceremony",
      date: "29th November 2026",
      time: "6:00 PM",
      description:
        "The evening begins with the exchange of rings, as two hearts formally promise a lifetime together, surrounded by the warmth and blessings of family and friends.",
    },
    "ganesh-sthapana": {
      title: "Ganesh Sthapana",
      date: "29th November 2026",
      time: "6:45 PM",
      description:
        "Every auspicious beginning starts with Lord Ganesh. Ganesh Sthapana is the ritual installation and worship of Lord Ganpati, the remover of obstacles, invoking his blessings so that all the celebrations ahead unfold smoothly and joyfully.",
    },
    pithi: {
      title: "Pithi Ceremony",
      date: "29th November 2026",
      time: "7:15 PM",
      description:
        "A turmeric-filled tradition where loved ones gently apply haldi to the bride and groom, blessing them with glow, good fortune and happiness before the big day. Expect laughter, songs and plenty of yellow.",
    },
    "sangeet-garba": {
      title: "Sangeet & Garba Night",
      date: "29th November 2026",
      time: "8:30 PM onwards",
      description:
        "Come dressed in your finest festive attire and dance the night away with us. Expect garba, dandiya, live music and performances by family and friends.",
    },
    "grah-shanti": {
      title: "Grah Shanti Pooja",
      date: "30th November 2026",
      time: "8:00 AM",
      description:
        "A sacred pooja to appease the planetary deities, seeking peace, prosperity and harmony as the couple begins their new journey together.",
    },
    "lagna-vidhi": {
      title: "Lagna Vidhi",
      date: "30th November 2026",
      time: "12:31 PM",
      description:
        "The sacred wedding ceremony. In the presence of the holy fire and with the chanting of mantras, the couple takes their vows and begins life as one.",
    },
  },
  venue: {
    name: "Samata Palace & Samata Royal",
    shortName: "Samata Palace",
    address:
      "Samata Palace & Samata Royal AC, Nira Baramati MH 221 Highway, Pharande Nagar Rd, Nimbut, Maharashtra 412102, India",
    city: "Nimbut, Maharashtra",
  },
  ui: {
    envelopeCta: "Click to open",
    envelopeAria: "Click to open invitation",
    waxSealAlt: "Wax seal",
    heroPhotoAlt: (bride, groom) => `${bride} and ${groom}, together`,
    weds: "weds",
    scroll: "Scroll",
    scrollAria: "Scroll to continue",
    countdownLabel: "Until we meet",
    countdownUnits: { days: "Days", hours: "Hours", minutes: "Mins", seconds: "Secs" },
    countdownAria: (days, hours, minutes, seconds) =>
      `Countdown to the wedding: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`,
    countdownDone: "The celebration has begun",
    countdownDoneNote: "With love & blessings",
    coupleHeading: "The Couple",
    portraitAlt: (name) => `Portrait of ${name}`,
    eventsHeading: "Wedding Events",
    eventsSubheading: "Celebrations across our sacred days",
    venueHeading: "Venue",
    getDirections: "Get Directions",
    mapTitle: (venueName) => `Map to ${venueName}`,
    mapPlaceholder: "Map loads as you scroll near",
    monogramAlt: (bride, groom) => `${bride} & ${groom} monogram`,
    shareInvitation: "Share Invitation",
    linkCopied: "Link Copied",
    musicStart: "Tap to start music",
    musicUnmute: "Unmute music",
    musicMute: "Mute music",
    backToTop: "Back to top",
  },
};
