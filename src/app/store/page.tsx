import Link from "next/link";
import Reveal from "@/components/Reveal";
import { tools } from "@/lib/tools";

export default function StorePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Store
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl">
          mkrHub &amp; tool catalog
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          mkrHub is free — pay what you want, including $0. Individual tools
          and category packs that plug into it will show up here over time.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <Reveal key={tool.slug} delay={i * 0.08}>
            {tool.status === "available" ? (
              <Link
                href={`/store/${tool.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold">{tool.name}</h2>
                    <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                      Free
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{tool.tagline}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {tool.description}
                  </p>
                </div>
                <span className="mt-6 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                  Get it &rarr;
                </span>
              </Link>
            ) : (
              <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-border p-6 opacity-60">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-semibold">{tool.name}</h2>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{tool.tagline}</p>
                </div>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
