"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * Flips data-theme on <html> and remembers the choice. Both icons are always
 * rendered and swapped with CSS (`dark:`), so server and client markup match
 * even though the theme is only known in the browser. The icons rotate and
 * fade into each other; the page colors cross-fade via .theme-switching.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    root.classList.add("theme-switching");
    root.dataset.theme = next;
    window.setTimeout(() => root.classList.remove("theme-switching"), 350);

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className="btn relative size-9 text-slate hover:bg-chip hover:text-ink">
      <SunIcon className="absolute size-5 -rotate-90 scale-50 opacity-0 transition duration-300 motion-reduce:transition-none dark:rotate-0 dark:scale-100 dark:opacity-100" />
      <MoonIcon className="absolute size-5 transition duration-300 motion-reduce:transition-none dark:rotate-90 dark:scale-50 dark:opacity-0" />
    </button>
  );
}
