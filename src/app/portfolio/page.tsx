import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects, credits } from "@/lib/projects";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Portfolio
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-balance sm:text-5xl">
          Selected work
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Films, series and games worked on — with credits, roles and
          renders/screenshots per project. Content below is placeholder until
          final assets are ready.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <section className="mt-24 border-t border-border pt-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Credits
          </h2>
          <p className="mt-2 text-sm text-muted">
            Chronological studio and role history.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
          {credits.map((credit, i) => (
            <Reveal key={`${credit.year}-${credit.project}`} delay={i * 0.05}>
              <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="w-12 shrink-0 font-mono text-xs text-muted">
                    {credit.year}
                  </span>
                  <span className="text-sm font-medium">
                    {credit.project}
                  </span>
                </div>
                <span className="text-xs text-muted sm:text-right">
                  {credit.role} — {credit.studio}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
