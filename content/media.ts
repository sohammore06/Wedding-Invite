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
  coupleIllustration: "/media/couple-photo.webp",
  portraits: {
    bride: "/media/shruti-photo.webp",
    groom: "/media/aditya-photo.webp",
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
