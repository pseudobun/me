import { Metadata } from "next";

type ExtendedMetadata = Record<string, Metadata>;

export const METADATA: ExtendedMetadata = {
  root: {
    title: "Urban Vidovič | Portfolio",
    description: "Urban Vidovič is a computer science engineer ...",
    openGraph: {
      title: "Bunny's Den",
      description: "Urban's personal website. Written with 🤍.",
      url: "https://me.bunnysden.si",
      siteName: "Bunny's Den",
      images: [
        {
          url: "https://me.bunnysden.si/api/og",
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
      images: ["https://me.bunnysden.si/api/og"],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
  },
};
