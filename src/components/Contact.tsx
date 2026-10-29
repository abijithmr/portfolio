import { profile } from "@/data/profile";
import { Glass } from "./Glass";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export function Contact() {
  const { links } = profile;

  return (
    <section aria-labelledby="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Glass className="overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
        {/* A local glow behind this pane only, so the closing panel reads as the brightest glass on the page. */}
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-cyan/20 blur-3xl" />

        <h2 id="contact" className="max-w-[16ch] font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
          Let&apos;s build something together
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-mist">
          I&apos;m in my final year and open to software engineering roles and internships starting {profile.education.graduation}.
          Email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={`mailto:${links.email}`} className="btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-lg font-medium hover:-translate-y-0.5">
            <MailIcon className="size-5" />
            {links.email}
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-lg font-medium hover:-translate-y-0.5"
          >
            <FileIcon className="size-5" />
            View resume
          </a>
          <a href={links.resume} download className="glass-pill inline-flex items-center justify-center px-6 py-3.5 text-lg font-medium text-mist hover:-translate-y-0.5 hover:text-frost">
            Download PDF
          </a>
        </div>

        <div className="mt-10 flex gap-3 border-t border-white/10 pt-8">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-sm">
            <GitHubIcon className="size-4" />
            github.com/{profile.githubUser}
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="glass-pill inline-flex items-center gap-2 px-4 py-2 text-sm">
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </Glass>

      <footer className="mt-12 text-center text-sm text-mist">
        © {profile.name}. Built with Next.js.
      </footer>
    </section>
  );
}
