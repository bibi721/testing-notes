/**
 * Single source of truth for site-wide constants. Pages, layout
 * components, and SEO metadata all read from here rather than
 * hard-coding strings, so a rebrand or nav change happens in one place.
 */

export const siteConfig = {
  name: "Testing Notes",
  title: "Testing Notes — A Software Testing Learning Journey",
  description:
    "A personal blog documenting a software testing learning journey — manual testing, test automation, API testing, and QA career notes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://testingnotes.dev",
  ogImage: "/og-image.png",
  author: {
    name: "Testing Notes",
    email: "hello@testingnotes.dev",
  },
  links: {
    twitter: "https://twitter.com/testingnotes",
    github: "https://github.com/testingnotes",
    linkedin: "https://linkedin.com/in/testingnotes",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Resources", href: "/resources" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: [
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "RSS", href: "/rss.xml" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
