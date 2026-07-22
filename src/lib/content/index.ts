import type { ContentRepository } from "./repository";
import { FileSystemContentRepository } from "./filesystem-repository";

/**
 * The single instantiation point for the content source. Every page
 * and component imports `contentRepository` from here - never the
 * concrete `FileSystemContentRepository` class directly. Swapping to
 * a CMS later means changing this one line to a new class that
 * satisfies the same `ContentRepository` interface.
 */
export const contentRepository: ContentRepository =
  new FileSystemContentRepository();

export type { ContentRepository } from "./repository";
export * from "@/types/content";
