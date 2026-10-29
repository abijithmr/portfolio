import { profile } from "@/data/profile";
import { FileIcon, MailIcon } from "./icons";

export function Contact() {
  const { links } = profile;

  return (
    <>
      {/*
        Fills the viewport and cancels the global scroll offset (-scroll-mt-24), so
        "Contact" in the nav lands with this section at the very top instead of
        leaving the end of the tech stack showing above it.
      */}
      <section
        id="contact"
        aria-labelledby="contact-title"
        className="-scroll-mt-24 mx-auto flex min-h-dvh max-w-6xl items-center px-4 pb-16 pt-28 sm:px-6"
      >
        <div className="w-full rounded-[var(--radius-tile)] border border-transparent bg-solid px-7 py-12 text-white sm:px-12 sm:py-16 dark:border-line">
          <h2 id="contact-title" className="max-w-[16ch] text-4xl font-medium tracking-[-0.035em] sm:text-6xl">
            Let&apos;s build something together
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-white/70">
            I&apos;m in my final year and open to software engineering roles and internships starting {profile.education.graduation}.
            Email is the fastest way to reach me.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${links.email}`} className="btn bg-white px-6 py-3.5 text-neutral-900 hover:bg-sun">
              <MailIcon className="size-5" />
              {links.email}
            </a>
            <a
              href={links.resume}
              download={profile.resumeFileName}
              className="btn border border-white/25 px-6 py-3.5 hover:bg-white/10"
            >
              <FileIcon className="size-5" />
              Download resume
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate sm:px-6">© {profile.name}</p>
      </footer>
    </>
  );
}
