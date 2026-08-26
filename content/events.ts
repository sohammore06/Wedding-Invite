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

export const events: WeddingEvent[] = [
  {
    id: "ganesh-sthapna",
    title: "Ganesh Sthapna / Griha Shanti",
    date: "28th November 2026",
    time: "9:00 AM onwards",
    venue: "Residence — More Family Home",
    description:
      "We begin our celebrations with a prayerful invocation, seeking blessings for peace, prosperity, and harmony in our new journey together.",
    icon: "/media/icons/ganesh.svg",
    order: 1,
  },
  {
    id: "mehendi",
    title: "Mehendi Ceremony",
    date: "28th November 2026",
    time: "4:00 PM onwards",
    venue: "Residence — More Family Home",
    description:
      "An evening of colour, music, and intricate henna artistry — where laughter flows as freely as chai and every hand tells a story of celebration.",
    icon: "/media/icons/mehendi.svg",
    order: 2,
  },
  {
    id: "sangeet-garba",
    title: "Sangeet & Garba Night",
    date: "29th November 2026",
    time: "7:00 PM onwards",
    venue: "Celebration Hall — TBD",
    description:
      "Come dressed in your finest festive attire and dance the night away with us. Expect garba, dandiya, live music, and memories that will last a lifetime.",
    icon: "/media/icons/garba.svg",
    order: 3,
  },
  {
    id: "haldi",
    title: "Pithi / Haldi Ceremony",
    date: "30th November 2026",
    time: "10:00 AM onwards",
    venue: "Residence — Shah Family Home",
    description:
      "A morning bathed in golden turmeric and blessings, as family and friends shower us with love, laughter, and auspicious wishes.",
    icon: "/media/icons/haldi.svg",
    order: 4,
  },
  {
    id: "jain-rituals",
    title: "Jain Rituals",
    date: "30th November 2026",
    time: "As per muhurat",
    venue: "Samata Palace & Samata Royal — Nimbut",
    description:
      "Sacred Jain ceremonies honouring our faith and traditions. Details to be shared closer to the date — please edit or remove this event as applicable to your family.",
    icon: "/media/icons/jain.svg",
    order: 5,
  },
  {
    id: "baraat",
    title: "Baraat / Varghodo",
    date: "30th November 2026",
    time: "5:00 PM onwards",
    venue: "Samata Palace & Samata Royal — Procession",
    description:
      "The groom's grand procession arrives with music, dancing, and jubilant celebration — a spectacle of joy that welcomes two families into one.",
    icon: "/media/icons/baraat.svg",
    order: 6,
  },
  {
    id: "wedding",
    title: "Wedding Ceremony (Lagna / Vidhi)",
    date: "30th November 2026",
    time: "7:00 PM onwards",
    venue: "Samata Palace & Samata Royal — Nimbut",
    description:
      "The sacred moment when two souls unite before family, friends, and the divine. We request the honour of your presence as we take our vows.",
    icon: "/media/icons/wedding.svg",
    order: 7,
    isHero: true,
  },
  {
    id: "reception",
    title: "Reception",
    date: "1st December 2026",
    time: "7:30 PM onwards",
    venue: "Samata Palace & Samata Royal — Nimbut",
    description:
      "An elegant evening of dinner, toasts, and celebration as we thank you for being part of our story. Your blessings mean everything to us.",
    icon: "/media/icons/reception.svg",
    order: 8,
  },
];
