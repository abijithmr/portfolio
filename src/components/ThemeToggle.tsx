"use client";

import { MoonIcon, SunIcon } from "./icons";

/**
 * Flips data-theme on <html> and remembers the choice. Both icons are always
 * rendered and swapped with CSS (`dark:`), so server and client markup match
 * even though the theme is only known in the browser.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className="btn size-9 text-slate hover:bg-chip hover:text-ink">
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
