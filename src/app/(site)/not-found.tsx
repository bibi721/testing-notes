import { NotFoundContent } from "@/components/shared/not-found-content";

/**
 * Fires when a page inside the (site) segment tree explicitly calls
 * notFound() - e.g. /blog/[slug] for a slug that doesn't exist. For
 * genuinely unmatched routes that never match any route at all (like
 * /this-route-does-not-exist), see the root-level app/not-found.tsx
 * instead - route-group-nested not-found files don't catch those.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
