"use client";

import {
  useEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

export default function OtpCodeInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  hasError = false,
}: {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  onComplete: (code: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function distribute(text: string, startIndex: number) {
    const clean = text.replace(/\D/g, "");
    if (!clean) return;

    const next = digits.slice();
    let cursor = startIndex;
    for (const ch of clean) {
      if (cursor >= length) break;
      next[cursor] = ch;
      cursor++;
    }

    const joined = next.join("");
    onChange(joined);
    inputRefs.current[Math.min(cursor, length - 1)]?.focus();
    if (joined.length === length) onComplete(joined);
  }

  function handleChange(i: number, e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw.length > 1) {
      distribute(raw, i);
      return;
    }

    const digit = raw.replace(/\D/g, "");
    const next = digits.slice();
    next[i] = digit;
    const joined = next.join("");
    onChange(joined);

    if (digit && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
    if (joined.length === length) {
      onComplete(joined);
    }
  }

  function handleKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        const next = digits.slice();
        next[i] = "";
        onChange(next.join(""));
      } else if (i > 0) {
        const next = digits.slice();
        next[i - 1] = "";
        onChange(next.join(""));
        inputRefs.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      inputRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      inputRefs.current[i + 1]?.focus();
    }
  }

  function handlePaste(i: number, e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    distribute(e.clipboardData.getData("text"), i);
  }

  function handleFocus(e: FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  return (
    <div className="flex gap-2">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          aria-label={`Digit ${i + 1} of ${length}`}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={handleFocus}
          className={`h-12 w-9 rounded-xl border bg-background text-center text-lg font-semibold outline-none transition-colors focus:border-accent disabled:opacity-60 ${
            hasError ? "border-red-400/60" : "border-border"
          }`}
        />
      ))}
    </div>
  );
}
