export const couple = {
  bride: {
    name: "Shruti",
    fullName: "Shruti",
    bio: "A soul who finds joy in quiet mornings, family gatherings, and the simple beauty of traditions passed down through generations. She believes love is found in the little things — a shared laugh, a warm cup of chai, a hand held through every season.",
    portrait: "/media/shruti-portrait.svg",
  },
  groom: {
    name: "Aditya",
    fullName: "Aditya",
    bio: "Grounded in values, guided by kindness, and always ready with a smile that lights up every room. He cherishes the bonds of family and dreams of building a home filled with laughter, gratitude, and endless adventures together.",
    portrait: "/media/aditya-portrait.svg",
  },
  wedding: {
    date: "30th November",
    dateFull: "Sunday, 30th November 2026",
    year: 2026,
    /** Ceremony start — countdown target (IST) */
    ceremonyAt: "2026-11-30T12:31:00+05:30",
    tagline: "Two hearts, one sacred promise",
  },
  welcomeNote: {
    greeting: "With hearts full of gratitude and joy",
    body: [
      "Dear beloved family and friends,",
      "With the blessings of our elders and the grace of the divine, we invite you to witness and celebrate the sacred union of our hearts.",
      "Your presence has always been a gift in our lives. To have you stand beside us on this most cherished day would mean the world to us — for a wedding is not merely a ceremony, but a gathering of souls who have shaped who we are.",
      "We look forward to sharing this journey of love, laughter, and new beginnings with you.",
    ],
    closing: "With warmth and anticipation,",
  },
  howTheyMet:
    "Some love stories begin with a glance; ours began with a conversation that never seemed to end. Through seasons of friendship and moments of quiet understanding, we discovered that the best journeys are those walked together — hand in hand, heart in heart.",
  signOff: {
    message: "With love and blessings,",
    names: "Shruti & Aditya",
    family: "The Doshi & Gujar Families",
  },
  seo: {
    title: "Shruti & Aditya | Wedding Invitation",
    description:
      "You are cordially invited to celebrate the wedding of Shruti & Aditya on 30th November. Join us for a joyous Jain-Gujarati celebration filled with love, tradition, and blessings.",
    ogImage: "/media/og-image.svg",
    siteUrl: "https://shruti-aditya-wedding.vercel.app",
  },
} as const;
