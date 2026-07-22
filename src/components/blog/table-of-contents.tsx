import type { TocEntry } from "@/lib/content/toc";

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="text-foreground mb-3 font-medium">On this page</p>
      <ul className="border-border space-y-2 border-l">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? "ml-4" : ""}>
            <a
              href={`#${entry.id}`}
              className="text-muted-foreground hover:border-foreground hover:text-foreground -ml-px block border-l border-transparent pl-4 transition-colors"
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
