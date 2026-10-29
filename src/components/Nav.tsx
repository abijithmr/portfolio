import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

/** Floating glass capsule: the one piece of chrome that sits over scrolling content. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Primary" className="nav-in glass flex w-fit items-center gap-2 rounded-full p-1.5 sm:gap-6">
        <ul className="hidden items-center text-sm sm:flex sm:pl-2">
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="rounded-full px-3 py-1.5 text-slate transition-colors hover:bg-chip hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={profile.links.resume}
            download={profile.resumeFileName}
            className="btn bg-btn px-4 py-1.5 text-sm text-on-btn hover:bg-cobalt hover:text-white"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
