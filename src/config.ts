import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://tungdevpro.github.io",
  author: "Tungdevpro",
  desc: "I often gossip and write around about things like technology and my life",
  title: "Tungdevpro (Vito)",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  quickIntroduceMySelf: `Hi, I'm Vito — a mobile engineer with hands-on experience in native Android and iOS development. I also explore Flutter, Rust, and blockchain when curiosity strikes. Here I write about what I build and what the journey teaches me.`,
  fact: `(fact): Addicted to coffee and fixing bugs at 3AM`,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/tungdevpro",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/tungdevpro/",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/tungdevpro",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:tungdm.work@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
