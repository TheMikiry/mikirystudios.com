"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "font-mono text-xs uppercase tracking-wide text-muted";

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
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className={fieldClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
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
