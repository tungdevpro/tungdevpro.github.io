import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://tungdevpro.github.io", // replace this with your deployed domain
  author: "Vito",
  desc: "I often gossip and write around about things like technology and my life",
  title: "Tung Do (Vito)",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: false,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
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
    href: "mailto:tungdo21899@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];
