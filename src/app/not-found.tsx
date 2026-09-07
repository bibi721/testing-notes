import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { NotFoundContent } from "@/components/shared/not-found-content";

/**
 * Handles URLs that don't match ANY defined route (e.g.
 * /this-route-does-not-exist). This is distinct from
 * (site)/not-found.tsx, which only fires when a page already inside
 * that route group explicitly calls notFound() (e.g. a bad blog
 * slug). Per Next.js's App Router docs, only a not-found.tsx at the
 * true app root catches fully unmatched paths - one nested in a
 * route group is scoped to that group's already-matched segment
 * tree. Without this file, an unrecognized URL silently fell through
 * to Next's bare default 404 (no header/footer, no "Page not found"
 * heading), which is what the e2e suite caught.
 *
 * This file sits outside the (site) route group, so it isn't wrapped
 * by (site)/layout.tsx - Header/Footer are included directly here to
 * keep the same site chrome on every 404, however it's reached.
 */
export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
