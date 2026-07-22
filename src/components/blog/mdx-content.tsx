import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxOptions } from "@/lib/content/mdx-options";

/**
 * Renders a post's raw MDX body. Kept as its own component (rather
 * than inlined in the post page) so custom MDX component overrides
 * (callouts, embeds, etc.) have one obvious place to be added later
 * without touching the page itself.
 */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 max-w-none">
      <MDXRemote source={source} options={mdxOptions} />
    </div>
  );
}
