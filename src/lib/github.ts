import { cacheLife } from "next/cache";

// Only the fields the UI uses from GET /users/{user}/repos.
export interface Repo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
}

export type RepoResult = { ok: true; repos: Repo[] } | { ok: false; repos: [] };

/**
 * Fetches public repositories, cached for an hour so the page stays well under
 * GitHub's unauthenticated limit of 60 requests/hour. Set GITHUB_TOKEN to raise it.
 */
export async function getRepos(user: string): Promise<RepoResult> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`,
      { headers },
    );
    if (!res.ok) return { ok: false, repos: [] };

    const all = (await res.json()) as Repo[];
    // Forks and archived repos aren't his own active work; keep them only if nothing else exists.
    const own = all.filter((r) => !r.fork && !r.archived);
    return { ok: true, repos: own.length > 0 ? own : all };
  } catch {
    return { ok: false, repos: [] };
  }
}
