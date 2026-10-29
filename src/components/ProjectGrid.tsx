"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Repo } from "@/lib/github";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon, ForkIcon, StarIcon } from "./icons";

type SortKey = "stars" | "recent";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "stars", label: "Most starred" },
  { key: "recent", label: "Recently updated" },
];

const INITIAL_COUNT = 7;

// Fixed locale and time zone so server and client render the same string.
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// A handful of GitHub's own language colours; anything else falls back to slate.
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  "Jupyter Notebook": "#DA5B0B",
};

function compare(key: SortKey) {
  const byPushed = (a: Repo, b: Repo) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
  return key === "stars"
    ? (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count || byPushed(a, b)
    : byPushed;
}

export function ProjectGrid({ repos }: { repos: Repo[] }) {
  const [sort, setSort] = useState<SortKey>("stars");
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => [...repos].sort(compare(sort)), [repos, sort]);
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_COUNT);

  return (
    <LayoutGroup>
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading id="projects" title="Recent work">
          Live repositories, pulled from GitHub.
        </SectionHeading>

        {/* Segmented control, iOS style: the solid thumb slides between options. */}
        <div role="radiogroup" aria-label="Sort projects" className="glass inline-flex w-fit shrink-0 rounded-full p-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.key}
              role="radio"
              aria-checked={sort === opt.key}
              onClick={() => setSort(opt.key)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${sort === opt.key ? "text-on-btn" : "text-slate hover:text-ink"}`}
            >
              {sort === opt.key && (
                <motion.span
                  layoutId="sort-indicator"
                  className="absolute inset-0 rounded-full bg-btn"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* The first repo in the current order gets the wide featured tile. Cards glide on re-sort. */}
      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visible.map((repo, i) => (
            <motion.li
              key={repo.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              exit={{ opacity: 0, scale: 0.97 }}
              // Staggered by column so a row of cards settles left to right.
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: (i % 3) * 0.06 }}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <ProjectCard repo={repo} featured={i === 0} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {sorted.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setShowAll((v) => !v)} className="btn border border-line bg-tile px-5 py-2.5 text-sm hover:bg-chip">
            {showAll ? "Show fewer" : `Show all ${sorted.length} repositories`}
          </button>
        </div>
      )}
    </LayoutGroup>
  );
}

/** Repo homepages are free text: add a scheme if missing, and reject anything that isn't http(s). */
function safeHomepage(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function ProjectCard({ repo, featured }: { repo: Repo; featured: boolean }) {
  const topics = repo.topics?.slice(0, 3) ?? [];
  const homepage = safeHomepage(repo.homepage);

  return (
    <article className={`tile relative flex h-full flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:border-ink/40 ${featured ? "sm:p-8" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className={`font-medium tracking-tight ${featured ? "text-2xl" : "text-lg"}`}>
          {/* Stretched link: the whole card opens the repo, while the homepage link sits above it. */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="wrap-break-word after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-link"
          >
            {repo.name}
          </a>
        </h3>
        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-slate">
          <span className="flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
            <StarIcon className="size-3.5" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
            <ForkIcon className="size-3.5" />
            {repo.forks_count}
          </span>
        </div>
      </div>

      <p className={`mt-2 line-clamp-3 flex-1 leading-relaxed text-slate ${featured ? "text-lg" : ""}`}>
        {repo.description ?? "No description yet."}
      </p>

      {topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <li key={t} className="rounded-full bg-chip px-2.5 py-0.5 text-xs">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-slate">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-ink">
            <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] ?? "var(--color-slate)" }} />
            {repo.language}
          </span>
        )}
        {homepage && (
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-1 text-link hover:underline"
          >
            Live site
            <ExternalIcon className="size-3.5" />
          </a>
        )}
        <span className="ml-auto">Updated {dateFormat.format(new Date(repo.pushed_at))}</span>
      </div>
    </article>
  );
}
