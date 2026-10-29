import { Suspense } from "react";
import { getRepos } from "@/lib/github";
import { profile } from "@/data/profile";
import { ProjectGrid } from "./ProjectGrid";

export function Projects() {
  return (
    <section aria-labelledby="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
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
      <>
        <h2 id="projects" className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          Recent work
        </h2>
        <p className="tile mt-8 max-w-xl p-6 text-slate">
          {ok ? "No public repositories yet." : "GitHub didn't return the repository list just now."}{" "}
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-cobalt underline underline-offset-4">
            See them on GitHub
          </a>
          .
        </p>
      </>
    );
  }

  return <ProjectGrid repos={repos} />;
}

function ProjectsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className={`tile h-40 animate-pulse motion-reduce:animate-none ${i === 0 ? "lg:col-span-2" : ""}`} />
      ))}
    </div>
  );
}
