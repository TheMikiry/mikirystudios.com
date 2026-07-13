import Reveal from "@/components/Reveal";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance">
          Privacy Policy
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
          mikirystudios (&quot;we&quot;, &quot;us&quot;) operates this
          website. This page explains what data we collect when you use it,
          why, and how you can control it.
        </p>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            What we collect
          </h2>
          <ul className="flex flex-col gap-2">
            <li>
              <strong className="text-foreground">Account info</strong> —
              your email address, and either a password (stored hashed, we
              never see it in plain text) or, if you sign in with Google,
              your name, email, and profile picture as provided by Google.
            </li>
            <li>
              <strong className="text-foreground">Download/order history</strong>{" "}
              — which products you&apos;ve claimed from the store and when,
              so you can re-download them from your account.
            </li>
            <li>
              <strong className="text-foreground">Contact form submissions</strong>{" "}
              — name, email, and message, if you use the contact form.
            </li>
          </ul>
          <p className="mt-2">
            We don&apos;t collect payment card details ourselves — once
            paid products are live, that will be handled directly by our
            payment processor, and we only ever see that a payment
            succeeded, not your card details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Why we collect it
          </h2>
          <p>
            To create and manage your account, deliver the downloads
            you&apos;ve claimed, show your order history, and respond if you
            contact us. If you opt in to updates in the future, we&apos;ll
            use your email for that specifically — never bundled silently
            into anything else.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Who we share it with
          </h2>
          <p>This site runs on a small set of infrastructure providers:</p>
          <ul className="mt-2 flex flex-col gap-2">
            <li>
              <strong className="text-foreground">Supabase</strong> — hosts
              our database and handles authentication.
            </li>
            <li>
              <strong className="text-foreground">Google</strong> — if you
              choose to sign in with Google, they process that
              authentication.
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — hosts
              this website.
            </li>
          </ul>
          <p className="mt-2">
            We don&apos;t sell your data, and we don&apos;t share it with
            anyone else. As we add payments and email newsletters, we&apos;ll
            update this section to name those providers before they go
            live.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Cookies
          </h2>
          <p>
            We use one essential cookie to keep you signed in. We don&apos;t
            use advertising or third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Your rights
          </h2>
          <p>
            You can ask us to see, correct, or delete your account and
            associated data at any time — email us and we&apos;ll take care
            of it.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Children
          </h2>
          <p>
            This site isn&apos;t directed at children under 13, and we
            don&apos;t knowingly collect data from them.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Changes
          </h2>
          <p>
            If this policy changes materially, we&apos;ll update the date
            above. Continued use of the site after a change means you accept
            the update.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-foreground">
            Contact
          </h2>
          <p>
            Questions about your data — reach out via the{" "}
            <a href="/about#contact" className="text-accent">
              contact form
            </a>{" "}
            or at mikirystudios@gmail.com.
          </p>
        </section>
      </Reveal>
    </div>
  );
}
