import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-24">
      <section className="flex flex-col gap-6">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Rigger &amp; Technical Director
        </p>
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-balance sm:text-5xl">
          Daniel Cedeño — building characters, and the tools that build them.
        </h1>
        <p className="max-w-xl text-muted">
          I rig for games and animation, and I build the pipeline tools that
          make that work faster — starting with mkrHub, a free tool shelf for
          Maya artists.
        </p>
        <div className="flex gap-4 pt-2">
          <Link
            href="/mkrhub"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get mkrHub
          </Link>
          <Link
            href="/portfolio"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
          >
            View portfolio
          </Link>
        </div>
      </section>

      <section className="grid gap-6 border-t border-border pt-12 sm:grid-cols-3">
        <div>
          <h2 className="mb-2 text-sm font-semibold">Portfolio</h2>
          <p className="text-sm text-muted">
            Character rigging and TD work across games, animation and film.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold">mkrHub</h2>
          <p className="text-sm text-muted">
            A free, pay-what-you-want tool shelf for Maya — plus individual
            tools and packs to plug into it.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-semibold">About</h2>
          <p className="text-sm text-muted">
            Background, experience, and how to get in touch.
          </p>
        </div>
      </section>
    </div>
  );
}
