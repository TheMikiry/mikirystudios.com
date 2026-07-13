"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import AuthForm from "./AuthForm";

const PRESETS = [0, 5, 10, 25];

export default function ToolCheckout({
  toolSlug,
  toolName,
}: {
  toolSlug: string;
  toolName: string;
}) {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [amount, setAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckedAuth(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null),
    );
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  async function handleClaim() {
    if (!user) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      product_slug: toolSlug,
      amount_cents: Math.round(amount * 100),
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setClaimed(true);
  }

  if (!checkedAuth) {
    return (
      <div className="h-48 animate-pulse rounded-2xl border border-border bg-surface" />
    );
  }

  if (claimed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-sm"
      >
        <p className="font-medium text-foreground">
          {toolName} is in your account now.
        </p>
        <p className="mt-1 text-muted">
          (Development placeholder — the actual file delivery isn&apos;t
          wired up yet.)
        </p>
        <Link
          href="/account"
          className="mt-3 inline-block text-sm font-medium text-accent"
        >
          View in your account →
        </Link>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted">
          Sign in or create a free account to download {toolName} — this
          also gives you redownloads and order history for anything else you
          get from the store.
        </p>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          Name your price
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                amount === preset
                  ? "border-accent bg-accent text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {preset === 0 ? "$0" : `$${preset}`}
            </button>
          ))}
          <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
            <span className="text-muted">$</span>
            <input
              type="number"
              min={0}
              step={1}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-16 bg-transparent outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
              aria-label="Custom amount"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted">
          $0 is completely fine — {toolName} is free to use.
        </p>
      </div>

      <p className="text-xs text-muted">
        Downloading as <span className="text-foreground">{user.email}</span>
      </p>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleClaim}
        disabled={submitting}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
      >
        {submitting
          ? "Please wait…"
          : amount === 0
            ? "Get it free"
            : `Pay $${amount} & download`}
      </button>
    </div>
  );
}
