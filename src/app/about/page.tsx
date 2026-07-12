export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        About
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-balance">
        Daniel Cedeño — mikiry
      </h1>
      <div className="mt-8 flex flex-col gap-4 text-muted">
        <p>
          Bio content goes here — background, studios, focus areas (rigging,
          character TD, tools) and what mikirystudios is building toward.
        </p>
        <p>Placeholder — replace with real copy and headshot/photo.</p>
      </div>
    </div>
  );
}
