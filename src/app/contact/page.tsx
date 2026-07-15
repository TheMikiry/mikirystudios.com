import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Contact
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-balance sm:text-5xl">
          Let&apos;s talk
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted">
          Got a question, some feedback, or just want to reach out? :)
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <ContactForm />
      </Reveal>
    </div>
  );
}
