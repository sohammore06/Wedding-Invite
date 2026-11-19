import type { Metadata } from "next";
import { InvitationPage } from "@/components/InvitationPage";
import { getContent } from "@/content";

const { couple } = getContent("mr");

export const metadata: Metadata = {
  title: couple.seo.title,
  description: couple.seo.description,
  openGraph: {
    title: couple.seo.title,
    description: couple.seo.description,
    images: [
      {
        url: couple.seo.ogImage,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: couple.signOff.names,
      },
    ],
    url: couple.seo.siteUrl,
    siteName: couple.seo.title,
    locale: "mr_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: couple.seo.title,
    description: couple.seo.description,
    images: [couple.seo.ogImage],
  },
};

export default function MarathiPage() {
  return <InvitationPage locale="mr" />;
}
