import { Suspense } from "react";
import { getRepos } from "@/lib/github";
import { profile } from "@/data/profile";
import { ProjectGrid } from "./ProjectGrid";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section aria-labelledby="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="projects" title="Projects">
        Public repositories, pulled live from GitHub.
      </SectionHeading>
      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectList />
      </Suspense>
    </section>
  );
}

/** Server component: fetches repos (cached hourly) and hands them to the interactive grid. */
async function ProjectList() {
  const { ok, repos } = await getRepos(profile.githubUser);

  if (!ok || repos.length === 0) {
    return (
      <p className="glass max-w-xl p-6 text-mist">
        {ok ? "No public repositories yet." : "GitHub didn't return the repository list just now."}{" "}
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-frost underline decoration-cyan underline-offset-4">
          See them on GitHub
        </a>
        .
      </p>
    );
  }

  return <ProjectGrid repos={repos} />;
}

function ProjectsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="glass h-52 animate-pulse motion-reduce:animate-none" />
      ))}
    </div>
  );
}
