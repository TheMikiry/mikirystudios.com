"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email so I can reply.");
      return;
    }
    setError(null);
    // Placeholder: no backend wired yet.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent/40 bg-accent/10 p-6 text-sm"
      >
        <p className="font-medium text-foreground">Message sent — thanks.</p>
        <p className="mt-1 text-muted">
          (Development placeholder — this form isn&apos;t wired to a backend
          yet.)
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <label htmlFor="name" className="font-mono text-xs uppercase tracking-wide text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-mono text-xs uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="font-mono text-xs uppercase tracking-wide text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-3 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  );
}
