import { cacheLife } from "next/cache";

// Only the fields the UI uses from the GitHub REST repo object.
export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
}

export type RepoResult = { ok: true; repos: Repo[] } | { ok: false; repos: [] };

const API = "https://api.github.com";

const apiHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
};

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers: apiHeaders });
  if (!res.ok) throw new Error(`GitHub ${path}: ${res.status}`);
  return (await res.json()) as T;
}

/**
 * The REST API has no "pinned" endpoint (only GraphQL, which needs a token), so the
 * pinned list is read from the profile page: each pin renders as
 * <a href="/owner/name"><span class="repo">name</span></a>, in the order set on GitHub.
 */
async function getPinnedNames(user: string): Promise<string[]> {
  const res = await fetch(`https://github.com/${user}`);
  if (!res.ok) throw new Error(`GitHub profile: ${res.status}`);
  const html = await res.text();

  const names = Array.from(html.matchAll(/href="\/([\w.-]+\/[\w.-]+)"[^>]*>\s*<span class="repo"/g), (m) => m[1]);
  return [...new Set(names)];
}

/**
 * The user's pinned repositories with live stats, in pinned order. Cached for 5 minutes
 * (then refreshed in the background), so edits on GitHub show up without a redeploy while
 * the REST call stays at one request per refresh, far under the 60/hour anonymous limit.
 * Set GITHUB_TOKEN to raise that limit.
 */
export async function getPinnedRepos(user: string): Promise<RepoResult> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 86400 });

  try {
    const [pinned, own] = await Promise.all([
      getPinnedNames(user),
      api<Repo[]>(`/users/${user}/repos?per_page=100`),
    ]);
    const byName = new Map(own.map((r) => [r.full_name.toLowerCase(), r]));

    // Pins can also be org or other people's repos, which the user's own list doesn't include.
    const repos = await Promise.all(
      pinned.map((name) => byName.get(name.toLowerCase()) ?? api<Repo>(`/repos/${name}`).catch(() => null)),
    );
    return { ok: true, repos: repos.filter((r) => r !== null) };
  } catch {
    return { ok: false, repos: [] };
  }
}
