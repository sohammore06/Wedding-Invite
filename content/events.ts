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
    id: "engagement",
    title: "Engagement Ceremony",
    date: "29th November 2026",
    time: "6:00 PM",
    venue: "Celebration Hall — TBD",
    description:
      "The evening begins with the exchange of rings, as two hearts formally promise a lifetime together, surrounded by the warmth and blessings of family and friends.",
    icon: "/media/icons/reception.svg",
    order: 1,
  },
  {
    id: "ganesh-sthapana",
    title: "Ganesh Sthapana",
    date: "29th November 2026",
    time: "6:45 PM",
    venue: "Celebration Hall — TBD",
    description:
      "Every auspicious beginning starts with Lord Ganesh. Ganesh Sthapana is the ritual installation and worship of Lord Ganpati, the remover of obstacles, invoking his blessings so that all the celebrations ahead unfold smoothly and joyfully.",
    icon: "/media/icons/ganesh.svg",
    order: 2,
  },
  {
    id: "pithi",
    title: "Pithi Ceremony",
    date: "29th November 2026",
    time: "7:15 PM",
    venue: "Celebration Hall — TBD",
    description:
      "A turmeric-filled tradition where loved ones gently apply haldi to the bride and groom, blessing them with glow, good fortune and happiness before the big day. Expect laughter, songs and plenty of yellow.",
    icon: "/media/icons/haldi.svg",
    order: 3,
  },
  {
    id: "sangeet-garba",
    title: "Sangeet & Garba Night",
    date: "29th November 2026",
    time: "8:30 PM onwards",
    description:
      "Come dressed in your finest festive attire and dance the night away with us. Expect garba, dandiya, live music and performances by family and friends.",
    icon: "/media/icons/garba.svg",
    order: 4,
  },
  {
    id: "grah-shanti",
    title: "Grah Shanti Pooja",
    date: "30th November 2026",
    time: "8:00 AM",
    description:
      "A sacred pooja to appease the planetary deities, seeking peace, prosperity and harmony as the couple begins their new journey together.",
    icon: "/media/icons/jain.svg",
    order: 5,
  },
  {
    id: "varghodo",
    title: "Varghodo",
    date: "30th November 2026",
    time: "10:45 AM",
    description:
      "The groom's joyful procession, with dhol, music and dancing, as he arrives to the wedding venue, accompanied by family and friends.",
    icon: "/media/icons/baraat.svg",
    order: 6,
  },
  {
    id: "agman",
    title: "Agman",
    date: "30th November 2026",
    time: "11:15 AM",
    description:
      "The warm welcome of the groom's family, where the bride's family greets the baraat with tilak, aarti and heartfelt blessings.",
    icon: "/media/icons/mehendi.svg",
    order: 7,
  },
  {
    id: "lagna-vidhi",
    title: "Lagna Vidhi",
    date: "30th November 2026",
    time: "12:31 PM",
    description:
      "The sacred wedding ceremony. In the presence of the holy fire and with the chanting of mantras, the couple takes their vows and begins life as one.",
    icon: "/media/icons/wedding.svg",
    order: 8,
    isHero: true,
  },
];
