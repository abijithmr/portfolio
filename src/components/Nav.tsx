import { profile } from "@/data/profile";

const sections = [
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

/** Floating glass capsule: the one piece of chrome that sits over scrolling content. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Primary" className="glass flex w-full max-w-xl items-center justify-between rounded-full py-1.5 pl-5 pr-1.5">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.firstName}
          <span className="text-slate">.dev</span>
        </a>
        <ul className="flex items-center gap-0.5 text-sm">
          {sections.map((s) => (
            <li key={s.href} className="hidden sm:block">
              <a href={s.href} className="rounded-full px-3 py-1.5 text-slate transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn ml-1 bg-ink px-4 py-1.5 text-white hover:bg-cobalt"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
