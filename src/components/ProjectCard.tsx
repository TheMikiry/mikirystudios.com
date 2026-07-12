"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import PlaceholderCover from "./PlaceholderCover";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <PlaceholderCover
          seed={project.slug}
          label={project.kind}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{project.title}</h3>
          <span className="shrink-0 font-mono text-[11px] text-muted">
            {project.year}
          </span>
        </div>
        <p className="text-xs text-muted">
          {project.role} — {project.studio}
        </p>
        {project.status === "announced" && (
          <span className="mt-1 w-fit rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
            Announced
          </span>
        )}
        <p className="mt-2 text-xs leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}
