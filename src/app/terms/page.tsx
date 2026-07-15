import Reveal from "@/components/Reveal";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-balance">
          Terms of Service
        </h1>
        <p className="mt-3 font-mono text-xs text-muted">
          Last updated: July 13, 2026
        </p>
      </Reveal>

      <Reveal
        delay={0.05}
        className="prose-sm mt-10 flex flex-col gap-8 text-sm leading-relaxed text-muted"
      >
        <p>
          By using mikirystudios.com, you agree to the following. It&apos;s
          written in plain language on purpose — this is a small,
          independently-run site, not a corporate legal department.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Accounts
          </h2>
          <p>
            You&apos;re responsible for keeping your account credentials
            secure, and for anything that happens under your account. Let us
            know if you think it&apos;s been compromised.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            mkrHub &amp; store products
          </h2>
          <p>
            mkrHub is provided free, pay-what-you-want — including $0.
            Whatever you pay is a voluntary contribution, not a purchase
            price, so it&apos;s non-refundable. Paid tools and packs added
            to the store later will have their own terms shown at checkout.
          </p>
          <p className="mt-2">
            Tools are provided &quot;as is&quot;, without warranty of any
            kind. Use them at your own risk in your own pipeline — always
            keep backups.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Acceptable use
          </h2>
          <p>
            Don&apos;t use this site to break the law, attempt to access
            other users&apos; accounts or data, or disrupt the service for
            others.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Portfolio content
          </h2>
          <p>
            Artwork, renders, and project material shown on this site remain
            the property of their respective rights holders (studios,
            productions, or mikirystudios where noted) and are shown for
            portfolio purposes only.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Limitation of liability
          </h2>
          <p>
            This site and its tools are provided as-is, with no guarantee
            they&apos;re fault-free. We&apos;re not liable for damages
            arising from your use of the site or downloaded tools, to the
            extent permitted by law.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Changes
          </h2>
          <p>
            These terms may be updated as the site grows — we&apos;ll update
            the date above when that happens.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Contact
          </h2>
          <p>
            Questions — reach out via the{" "}
            <a href="/contact" className="text-accent">
              contact form
            </a>{" "}
            or at mikirystudios@gmail.com.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
