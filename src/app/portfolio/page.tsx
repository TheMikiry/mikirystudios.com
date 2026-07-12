type Project = {
  title: string;
  year: string;
  role: string;
  status: "released" | "announced";
  description: string;
};

// Placeholder data — replace with real credits once assets are ready.
const projects: Project[] = [
  {
    title: "Project Title",
    year: "2026",
    role: "Character Rigger",
    status: "announced",
    description: "Short description of the project and your contribution.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Portfolio
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-balance">
        Selected work
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Films, series and games worked on — with credits, roles and
        renders/screenshots per project. Content below is placeholder until
        final assets are ready.
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div className="flex aspect-[3/4] items-center justify-center bg-background text-xs text-muted">
              Cover art
            </div>
            <div className="flex flex-col gap-1 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">{project.title}</h2>
                <span className="font-mono text-[11px] text-muted">
                  {project.year}
                </span>
              </div>
              <p className="text-xs text-muted">{project.role}</p>
              {project.status === "announced" && (
                <span className="mt-1 w-fit rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                  Announced
                </span>
              )}
              <p className="mt-2 text-xs text-muted">{project.description}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-20 border-t border-border pt-12">
        <h2 className="text-xl font-semibold">Credits</h2>
        <p className="mt-2 text-sm text-muted">
          Chronological studio/role list — placeholder until full credits are
          added.
        </p>
      </section>
    </div>
  );
}
