import { Suspense } from "react";
import { getPinnedRepos, type Repo } from "@/lib/github";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { ExternalIcon, ForkIcon, StarIcon } from "./icons";

// Fixed locale and time zone so every render produces the same string.
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

export function Projects() {
  return (
    <section aria-labelledby="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <SectionHeading id="projects" title="Projects">
        My pinned repositories, pulled live from GitHub.
      </SectionHeading>

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectList />
      </Suspense>
    </section>
  );
}

async function ProjectList() {
  const { ok, repos } = await getPinnedRepos(profile.githubUser);

  if (repos.length === 0) {
    return (
      <p className="tile mt-8 max-w-xl p-6 text-slate">
        {ok ? "No pinned repositories yet." : "GitHub didn't return the pinned repositories just now."}{" "}
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-link underline underline-offset-4">
          See them on GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <li key={repo.id} className="reveal">
          <ProjectCard repo={repo} />
        </li>
      ))}
    </ul>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="tile h-40 animate-pulse motion-reduce:animate-none" />
      ))}
    </div>
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
    <article className="tile relative flex h-full flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:border-ink/40">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">
          {/* Stretched link: the whole card opens the repo, while the homepage link sits above it. */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="wrap-break-word after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-link"
          >
            {repo.name}
          </a>
        </h3>
        <div className="flex shrink-0 items-center gap-3 text-xs text-slate">
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

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate">{repo.description ?? "No description yet."}</p>

      {topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {topics.map((t) => (
            <li key={t} className="bg-chip px-2 py-0.5 text-xs">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-ink">
            <span aria-hidden className="size-2 bg-cobalt" />
            {repo.language}
          </span>
        )}
        {homepage && (
          <a href={homepage} target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center gap-1 text-link hover:underline">
            Live site
            <ExternalIcon className="size-3.5" />
          </a>
        )}
        <span className="ml-auto">Updated {dateFormat.format(new Date(repo.pushed_at))}</span>
      </div>
    </article>
  );
}
