import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

/** Floating glass bar: the one piece of chrome that sits over scrolling content. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Primary" className="nav-in glass flex w-fit items-center gap-2 p-1.5 sm:gap-6">
        <ul className="hidden items-center text-sm min-[400px]:flex sm:pl-2">
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="px-2 py-2.5 text-slate transition-colors hover:bg-chip hover:text-ink sm:px-3">
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
            className="btn h-10 bg-btn px-4 text-sm text-on-btn hover:bg-cobalt hover:text-white"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
