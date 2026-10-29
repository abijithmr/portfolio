"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";

const sections = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

/** Floating glass pill, in the spirit of the macOS menu bar and iOS tab bars. */
export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.1 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className="glass-pill flex w-full max-w-xl items-center justify-between gap-1 py-1.5 pl-4 pr-1.5"
      >
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          {profile.firstName}
          <span className="text-mist">.dev</span>
        </a>
        <ul className="flex items-center gap-0.5 text-sm">
          {sections.map((s) => (
            <li key={s.href} className="hidden sm:block">
              <a
                href={s.href}
                className="rounded-full px-3 py-1.5 text-mist transition-colors hover:bg-white/8 hover:text-frost"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ml-1 inline-block px-4 py-1.5 font-medium"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
