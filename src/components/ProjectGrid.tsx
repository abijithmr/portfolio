"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Repo } from "@/lib/github";
import { Glass } from "./Glass";
import { ExternalIcon, ForkIcon, StarIcon } from "./icons";

type SortKey = "stars" | "recent";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "stars", label: "Most starred" },
  { key: "recent", label: "Recently updated" },
];

const INITIAL_COUNT = 9;

// Fixed locale and time zone so server and client render the same string.
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// A handful of GitHub's own language colours; anything else falls back to mist.
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
      {/* Segmented control, iOS style: the highlight slides between options. */}
      <div role="radiogroup" aria-label="Sort projects" className="glass-pill mb-8 inline-flex p-1">
        {sortOptions.map((opt) => (
          <button
            key={opt.key}
            role="radio"
            aria-checked={sort === opt.key}
            onClick={() => setSort(opt.key)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors ${sort === opt.key ? "text-ink" : "text-mist hover:text-frost"}`}
          >
            {sort === opt.key && (
              <motion.span
                layoutId="sort-indicator"
                className="absolute inset-0 rounded-full bg-frost"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Cards glide to their new positions when the sort order changes. */}
      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {visible.map((repo) => (
            <motion.li
              key={repo.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ProjectCard repo={repo} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {sorted.length > INITIAL_COUNT && (
        <div className="mt-8 flex justify-center">
          <button onClick={() => setShowAll((v) => !v)} className="glass-pill px-5 py-2.5 text-sm font-medium">
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

function ProjectCard({ repo }: { repo: Repo }) {
  const topics = repo.topics?.slice(0, 3) ?? [];
  const homepage = safeHomepage(repo.homepage);

  return (
    <Glass as="article" className="group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1">
      <h3 className="text-lg font-medium tracking-tight">
        {/* Stretched link: the whole card opens the repo, while the homepage link sits above it. */}
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="wrap-break-word after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-cyan">
          {repo.name}
        </a>
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 leading-relaxed text-mist">
        {repo.description ?? "No description yet."}
      </p>

      {topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <li key={t} className="rounded-full bg-white/6 px-2.5 py-0.5 text-xs text-frost/80">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist tabular-nums">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: languageColors[repo.language] ?? "var(--color-mist)" }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
          <StarIcon className="size-3.5" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
          <ForkIcon className="size-3.5" />
          {repo.forks_count}
        </span>
        <span className="ml-auto">Updated {dateFormat.format(new Date(repo.pushed_at))}</span>
      </div>

      {homepage && (
        <a
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 px-3.5 py-1.5 text-sm"
        >
          Live site
          <ExternalIcon className="size-3.5" />
        </a>
      )}
    </Glass>
  );
}
