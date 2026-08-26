export const media = {
  envelope: {
    closed: "/media/envelope-closed.svg",
    fullscreen: "/media/envelope-fullscreen.png",
    open: "/media/envelope-open.svg",
    waxSeal: "/media/wax-seal.png",
    waxSealCracked: "/media/wax-seal.png",
    flaps: {
      top: "/media/envelope/flap-top.png",
      bottom: "/media/envelope/flap-bottom.png",
      left: "/media/envelope/flap-left.png",
      right: "/media/envelope/flap-right.png",
    },
  },
  coupleIllustration: "/media/couple-caricature.webp",
  journey: {
    car: "/media/journey/car.svg",
    road: "/media/journey/road.svg",
    venueGate: "/media/journey/venue-gate.svg",
    waypoints: {
      date: "/media/journey/waypoint-date.svg",
      venue: "/media/journey/waypoint-venue.svg",
      location: "/media/journey/waypoint-location.svg",
    },
    /** Portrait winding road — car travels top → destination (viewBox 360×640) */
    roadPath:
      "M 72 36 C 160 70, 292 95, 300 170 C 308 250, 70 290, 78 380 C 86 470, 250 510, 288 590",
  },
  portraits: {
    bride: "/media/shruti-portrait.svg",
    groom: "/media/aditya-portrait.svg",
  },
  gallery: [] as string[],
  audio: {
    backgroundMusic: "/media/audio/background-music.mp3",
    /** Optional — drop envelope-open.mp3 here; otherwise a subtle music swell is used */
    envelopeOpen: null as string | null,
  },
  motifs: {
    ganesh: "/media/motifs/ganesh-line.svg",
    mandala: "/media/motifs/mandala-corner.svg",
    monogram: "/media/motifs/monogram.webp",
  },
  ambient: {
    bird: "/media/ambient/bird.svg",
    butterfly: "/media/ambient/butterfly.svg",
  },
  lottie: {
    bird: null as string | null,
    butterfly: null as string | null,
  },
} as const;
