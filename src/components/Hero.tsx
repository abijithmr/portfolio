"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { avatarUrl, profile } from "@/data/profile";
import { Glass } from "./Glass";
import { FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

// The page's one orchestrated load sequence: children rise out of a blur in turn.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

export function Hero() {
  const { education, links } = profile;

  return (
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 md:grid-cols-[1.25fr_1fr] md:pt-40 lg:gap-16">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p variants={rise} className="text-lg text-mist">
          {profile.role}
        </motion.p>

        {/* Name set large and tight; the gradient fill reads like light on a glass edge. */}
        <h1 className="mt-3 font-display text-[clamp(3.25rem,10vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
          <motion.span variants={rise} className="block bg-linear-to-br from-white via-white to-mist bg-clip-text text-transparent">
            {profile.firstName}
          </motion.span>
          <motion.span variants={rise} className="block bg-linear-to-br from-white/90 via-violet to-cyan bg-clip-text text-transparent">
            {profile.lastName}
          </motion.span>
        </h1>

        <motion.p variants={rise} className="mt-6 max-w-[38ch] text-lg leading-relaxed text-frost/80 sm:text-xl">
          {profile.tagline}
        </motion.p>

        <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`mailto:${links.email}`} className="btn-primary inline-flex items-center gap-2 px-5 py-3 font-medium hover:-translate-y-0.5">
            <MailIcon className="size-4.5" />
            Email me
          </a>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill inline-flex items-center gap-2 px-5 py-3 font-medium hover:-translate-y-0.5"
          >
            <FileIcon className="size-4.5" />
            View resume
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="glass-pill grid size-12 place-items-center hover:-translate-y-0.5">
            <GitHubIcon className="size-5" />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="glass-pill grid size-12 place-items-center hover:-translate-y-0.5">
            <LinkedInIcon className="size-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Portrait behind glass, with the education card floating over its lower edge. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.35 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <Glass className="p-3">
          <div className="relative aspect-square overflow-hidden rounded-[1.25rem]">
            <Image
              src={avatarUrl}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 768px) 360px, 80vw"
              className="object-cover"
            />
            {/* Sheen across the photo so it sits *under* the glass rather than on top. */}
            <div aria-hidden className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-ink/40" />
          </div>
        </Glass>

        <Glass className="relative -mt-14 mx-4 p-5 sm:mx-6">
          <p className="flex items-center gap-2 text-sm text-cyan">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            {education.status}, graduating {education.graduation}
          </p>
          <p className="mt-2 font-medium leading-snug">{education.degree}</p>
          <p className="mt-1 text-sm leading-relaxed text-mist">
            {education.college}, {education.university}, {education.location}
          </p>
        </Glass>
      </motion.div>
    </section>
  );
}
