import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-4xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>

        <nav aria-label="Footer" className="flex items-center gap-4">
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Text links rather than brand glyphs - keeps the footer
            minimal and avoids depending on trademarked logo icons
            (lucide-react no longer ships GitHub/Twitter/LinkedIn
            marks as of the installed version). */}
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.links.github}
            className="hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.twitter}
            className="hover:text-foreground"
          >
            Twitter
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            className="hover:text-foreground"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
