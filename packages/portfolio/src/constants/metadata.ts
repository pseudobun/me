import { Metadata } from "next";

type ExtendedMetadata = Record<string, Metadata>;

export const METADATA: ExtendedMetadata = {
  root: {
    title: "Urban Vidovič | Portfolio",
    description: "Urban Vidovič is a computer science engineer ...",
    openGraph: {
      title: "Bunny's Den",
      description: "Urban's personal website. Written with 🤍.",
      url: "https://pseudobun.dev",
      siteName: "Bunny's Den",
      images: [
        {
          url: "https://pseudobun.dev/api/og",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Bunny's Den",
      description: "Urban's personal website. Written with 🤍.",
      creator: "@pseudourban",
      images: ["https://pseudobun.dev/api/og"],
    },
    verification: {
      google: "6FH2mAeC6dWc9Y5PCXe_dec8X3SvLKRZx-aZ1I7fanY",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  },
};
