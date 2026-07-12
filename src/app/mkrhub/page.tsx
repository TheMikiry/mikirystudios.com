export default function MkrHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        mkrHub
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-balance">
        A free tool shelf for Maya artists
      </h1>
      <p className="mt-4 text-muted">
        mkrHub is free — pay what you want, including $0. Enter your email to
        get the download link. Individual tools and packs that plug into
        mkrHub will be available separately.
      </p>

      <div className="mt-10 rounded-lg border border-border bg-surface p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          Download
        </p>
        <p className="mt-3 text-sm text-muted">
          Email capture + pay-what-you-want checkout goes here (Stripe +
          Supabase wiring — not yet connected).
        </p>
      </div>
    </div>
  );
}
