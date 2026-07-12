"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.p
        variants={item}
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted"
      >
        Rigger &amp; Technical Director
      </motion.p>
      <motion.h1
        variants={item}
        className="max-w-2xl text-4xl font-semibold leading-tight text-balance sm:text-5xl md:text-6xl"
      >
        Building characters, and the tools that build them.
      </motion.h1>
      <motion.p variants={item} className="max-w-xl text-muted">
        I&apos;m Daniel Cedeño — I rig for games and animation, and I build
        the pipeline tools that make that work faster. Starting with mkrHub,
        a free tool shelf for Maya artists.
      </motion.p>
      <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/tools"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Get mkrHub
        </Link>
        <Link
          href="/portfolio"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
        >
          View portfolio
        </Link>
      </motion.div>
    </motion.section>
  );
}
