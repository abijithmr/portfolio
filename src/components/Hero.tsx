"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { avatarUrl, profile } from "@/data/profile";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

// The page's one orchestrated load sequence: the bento tiles settle in turn.
const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const settle: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 160, damping: 22 } },
};

export function Hero() {
  const { education, links } = profile;

  return (
    <motion.section
      id="top"
      aria-label="Introduction"
      variants={grid}
      initial="hidden"
      animate="show"
      className="mx-auto grid max-w-6xl gap-4 px-4 pt-28 sm:px-6 md:grid-cols-3 md:pt-32"
    >
      {/* Name tile */}
      <motion.div variants={settle} className="tile flex flex-col justify-between p-7 sm:p-10 md:col-span-2">
        <div>
          <p className="text-slate">{profile.role}</p>
          <h1 className="mt-3 text-[clamp(2.75rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-slate">{profile.tagline}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a href={`mailto:${links.email}`} className="btn bg-btn px-5 py-3 text-on-btn hover:bg-cobalt hover:text-white">
            <MailIcon className="size-4.5" />
            Email me
          </a>
          <a href={links.resume} download={profile.resumeFileName} className="btn border border-line px-5 py-3 hover:bg-chip">
            <FileIcon className="size-4.5" />
            Download resume
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="btn size-12 border border-line hover:bg-chip">
            <GitHubIcon className="size-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="btn size-12 border border-line hover:bg-chip">
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </motion.div>

      {/* Photo tile: circular portrait with a frosted badge floating over its lower edge */}
      <motion.div variants={settle} className="tile flex items-center justify-center p-8">
        <div className="relative">
          <div className="relative size-44 overflow-hidden rounded-full bg-chip ring-1 ring-line sm:size-52">
            <Image
              src={avatarUrl}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="208px"
              className="object-cover"
            />
          </div>
          <p className="glass absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium">
            <span aria-hidden className="size-2 rounded-full bg-sun" />
            {education.status}, graduating {education.graduation}
          </p>
        </div>
      </motion.div>

      {/* Education: solid cobalt */}
      <motion.div variants={settle} className="rounded-[var(--radius-tile)] bg-cobalt p-7 text-white">
        <h2 className="text-xl font-medium tracking-tight">Education</h2>
        <p className="mt-4 font-medium leading-snug">{education.degree}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {education.college}, {education.university}
        </p>
        <p className="mt-3 text-sm text-white/80">{education.location}</p>
      </motion.div>

      {/* whoami: solid ink terminal */}
      <motion.div variants={settle} className="rounded-[var(--radius-tile)] border border-transparent bg-solid p-7 font-mono text-sm leading-7 text-white/90 dark:border-line">
        <p>
          <span className="text-white/45">$</span> whoami
        </p>
        <p>
          role: <span className="text-white">{profile.role.toLowerCase()}</span>
        </p>
        <p>
          location: <span className="text-white">Kerala, India</span>
        </p>
        <p>
          status: <span className="text-sun">graduating {education.graduation}</span>
        </p>
        <p className="mt-1 text-white/45">
          <span className="inline-block h-4 w-2 translate-y-0.5 bg-white/70 motion-safe:animate-pulse" />
        </p>
      </motion.div>

      {/* Email: solid sun */}
      <motion.a
        variants={settle}
        href={`mailto:${links.email}`}
        className="group flex flex-col justify-between rounded-[var(--radius-tile)] bg-sun p-7 text-neutral-900 transition-transform duration-300 hover:-translate-y-0.5"
      >
        <MailIcon className="size-6" />
        <div className="mt-8">
          <p className="text-xl font-medium tracking-tight">Let&apos;s talk</p>
          <p className="mt-1 break-all text-sm text-neutral-900/75 group-hover:underline">{links.email}</p>
        </div>
      </motion.a>
    </motion.section>
  );
}
