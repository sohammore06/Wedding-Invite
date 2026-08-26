import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Tangerine } from "next/font/google";
import { couple } from "@/content";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const scriptFont = Tangerine({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(couple.seo.siteUrl),
  title: couple.seo.title,
  description: couple.seo.description,
  openGraph: {
    title: couple.seo.title,
    description: couple.seo.description,
    images: [{ url: couple.seo.ogImage, width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: couple.seo.title,
    description: couple.seo.description,
    images: [couple.seo.ogImage],
  },
  icons: {
    icon: "/media/motifs/monogram.svg",
    apple: "/media/motifs/monogram.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
