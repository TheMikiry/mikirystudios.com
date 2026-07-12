import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";
import { tools } from "@/lib/tools";

export default function Home() {
  const featured = projects.slice(0, 3);
  const mkrhub = tools.find((t) => t.slug === "mkrhub")!;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-28 px-6 py-20 sm:py-28">
      <Hero />

      <section>
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Selected work
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Recent projects</h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden shrink-0 text-sm text-muted transition-colors hover:text-foreground sm:inline"
          >
            View all &rarr;
          </Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="mt-6 inline-block text-sm text-muted transition-colors hover:text-foreground sm:hidden"
        >
          View all &rarr;
        </Link>
      </section>

      <Reveal>
        <section className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {mkrhub.name}
          </p>
          <h2 className="max-w-md text-2xl font-semibold text-balance sm:text-3xl">
            {mkrhub.tagline}
          </h2>
          <p className="max-w-lg text-sm text-muted">{mkrhub.description}</p>
          <Link
            href="/store/mkrhub"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Get it — pay what you want
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section className="grid gap-6 border-t border-border pt-12 sm:grid-cols-3">
          <div>
            <h2 className="mb-2 text-sm font-semibold">Portfolio</h2>
            <p className="text-sm text-muted">
              Character rigging and TD work across games, animation and film.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold">Store</h2>
            <p className="text-sm text-muted">
              mkrHub and the individual tools and packs that plug into it.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold">About</h2>
            <p className="text-sm text-muted">
              Background, experience, socials, and how to get in touch.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
