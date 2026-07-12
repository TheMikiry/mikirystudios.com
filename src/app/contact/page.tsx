import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-4 text-muted">
          Questions about mkrHub, work inquiries, or anything else — send a
          message.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <ContactForm />
      </Reveal>
    </div>
  );
}
