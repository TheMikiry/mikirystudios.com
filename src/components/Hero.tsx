import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col gap-6">
      <p
        className="animate-reveal font-mono text-xs uppercase tracking-[0.2em] text-muted"
        style={{ animationDelay: "0.05s" }}
      >
        Rigger &amp; Technical Director
      </p>
      <h1
        className="animate-reveal max-w-2xl text-4xl font-semibold leading-tight text-balance sm:text-5xl md:text-6xl"
        style={{ animationDelay: "0.15s" }}
      >
        Building characters, and the tools that build them.
      </h1>
      <p
        className="animate-reveal max-w-xl text-muted"
        style={{ animationDelay: "0.25s" }}
      >
        I&apos;m Daniel Cedeño — I rig for games and animation, and I build
        the pipeline tools that make that work faster. Starting with mkrHub,
        a free tool shelf for Maya artists.
      </p>
      <div
        className="animate-reveal flex flex-wrap gap-4 pt-2"
        style={{ animationDelay: "0.35s" }}
      >
        <Link
          href="/store/mkrhub"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Get mkrHub
        </Link>
        <Link
          href="/portfolio"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
        >
          View portfolio
        </Link>
      </div>
    </section>
  );
}
