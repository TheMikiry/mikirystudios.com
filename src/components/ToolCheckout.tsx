"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRESETS = [0, 5, 10, 25];

export default function ToolCheckout({ toolName }: { toolName: string }) {
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email to get your download link.");
      return;
    }
    setError(null);
    // Placeholder: no backend wired yet. Stripe + Supabase handoff goes here.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-sm"
      >
        <p className="font-medium text-foreground">
          Thanks — check {email} for your download link.
        </p>
        <p className="mt-1 text-muted">
          (Development placeholder — email delivery isn&apos;t connected
          yet.)
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
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

      <div>
        <label
          htmlFor="email"
          className="font-mono text-xs uppercase tracking-wide text-muted"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
        <p className="mt-2 text-xs text-muted">
          Used to send your download link, and occasional mkrHub updates. No
          spam.
        </p>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-xs text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {amount === 0 ? "Get it free" : `Pay $${amount} & download`}
      </button>
    </form>
  );
}
