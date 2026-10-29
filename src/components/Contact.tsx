import { profile } from "@/data/profile";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Contact() {
  const { links } = profile;

  return (
    <>
      <section aria-labelledby="contact" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
        <div className="rounded-[var(--radius-tile)] bg-ink px-7 py-12 text-white sm:px-12 sm:py-16">
          <h2 id="contact" className="max-w-[16ch] text-4xl font-medium tracking-[-0.035em] sm:text-6xl">
            Let&apos;s build something together
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/70">
            I&apos;m in my final year and open to software engineering roles and internships starting {profile.education.graduation}.
            Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${links.email}`} className="btn bg-white px-6 py-3.5 text-ink hover:bg-sun">
              <MailIcon className="size-5" />
              {links.email}
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-white/25 px-6 py-3.5 hover:bg-white/10"
            >
              <FileIcon className="size-5" />
              View resume
            </a>
            <a href={links.resume} download className="btn px-6 py-3.5 text-white/70 hover:text-white">
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {profile.name}. Built with Next.js.</p>
          <div className="flex gap-5">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink">
              <GitHubIcon className="size-4" />
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-ink">
              <LinkedInIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
