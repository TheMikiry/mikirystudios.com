import Reveal from "@/components/Reveal";
import PlaceholderCover from "@/components/PlaceholderCover";
import ContactForm from "@/components/ContactForm";

const socials = [
  { label: "ArtStation", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
];

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

      <div className="mt-10 flex flex-col gap-8 sm:flex-row">
        <Reveal delay={0.05} className="shrink-0">
          <PlaceholderCover
            seed="about-portrait"
            label="Portrait"
            className="aspect-[4/5] w-full max-w-[220px] rounded-2xl"
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-1 flex-col gap-4 text-muted">
          <p>
            I&apos;m a rigger and technical director working across games and
            animation. I focus on character setup, deformation, and building
            the pipeline tools that keep production moving — most recently
            mkrHub, a free tool shelf for Maya artists.
          </p>
          <p>
            Bio placeholder — replace with real background, studios, and
            focus areas once ready.
          </p>

          <div className="mt-2 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="rounded-full border border-border px-4 py-1.5 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <section className="mt-20 border-t border-border pt-12">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-balance">
            Get in touch
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Questions about mkrHub, work inquiries, or anything else — send a
            message.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
