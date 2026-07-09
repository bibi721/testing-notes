import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:py-28">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {siteConfig.name}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
        {siteConfig.description}
      </p>
      <p className="text-muted-foreground mt-8 text-sm">
        Foundation phase complete — blog content, categories, series, and the
        resource library are wired up in the next phase.
      </p>
    </section>
  );
}
