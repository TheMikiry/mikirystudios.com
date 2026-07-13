import { redirect } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";
import { tools } from "@/lib/tools";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, product_slug, amount_cents, currency, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Account
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-balance">
            {user.email}
          </h1>
        </div>
        <SignOutButton />
      </Reveal>

      <section className="mt-14">
        <Reveal>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Your downloads
          </h2>
          <p className="mt-2 text-sm text-muted">
            Everything you&apos;ve claimed from the store — redownload
            anytime.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          {!orders || orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
              No downloads yet.{" "}
              <Link href="/store" className="text-accent">
                Browse the store
              </Link>
              .
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface">
              {orders.map((order) => {
                const tool = tools.find((t) => t.slug === order.product_slug);
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {tool?.name ?? order.product_slug}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-muted">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted">
                        {order.amount_cents === 0
                          ? "Free"
                          : `$${(order.amount_cents / 100).toFixed(2)}`}
                      </span>
                      <Link
                        href={`/store/${order.product_slug}`}
                        className="text-sm font-medium text-accent"
                      >
                        Download again
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
      </section>
    </div>
  );
}
