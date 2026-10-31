"use client";

import type { MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./icons";

const REVEAL_MS = 600;

/**
 * Flips data-theme on <html>, remembers the choice, and plays the switch as a View
 * Transition: the new theme grows out of the button as an expanding circle. Both icons
 * are always rendered and swapped with CSS (`dark:`), so server and client markup match
 * even though the theme is only known in the browser.
 */
export function ThemeToggle() {
  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
    };

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    // Origin and radius of the circle: the button centre out to the farthest viewport corner.
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    // Colour transitions are switched off while the snapshots are taken, otherwise the
    // "new" frame would catch every element mid-fade and the reveal would show a half-switched page.
    root.dataset.themeSwitching = "";
    const transition = document.startViewTransition(apply);

    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: REVEAL_MS, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
    transition.finished.finally(() => {
      delete root.dataset.themeSwitching;
    });
  }

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className="btn glass-item size-10 text-ink">
      <SunIcon className="hidden size-5 dark:block" />
      <MoonIcon className="size-5 dark:hidden" />
    </button>
  );
}
