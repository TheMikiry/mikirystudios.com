import Reveal from "@/components/Reveal";
import PlaceholderCover from "@/components/PlaceholderCover";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          About
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl">
          Daniel Cedeño — mikiry
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <PlaceholderCover
          seed="about-portrait"
          label="Portrait"
          className="aspect-[4/5] w-full max-w-xs rounded-2xl"
        />
      </Reveal>

      <Reveal delay={0.15} className="mt-8 flex flex-col gap-4 text-muted">
        <p>
          Bio content goes here — background, studios, focus areas (rigging,
          character TD, tools) and what mikirystudios is building toward.
        </p>
        <p>Placeholder — replace with real copy and headshot/photo.</p>
      </Reveal>
    </div>
  );
}
