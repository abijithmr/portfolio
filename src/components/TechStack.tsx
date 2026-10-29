import { techStack, type StackGroup } from "@/data/profile";
import { Glass } from "./Glass";
import { SectionHeading } from "./SectionHeading";

// Static class names so Tailwind can see them at build time.
const accentDot: Record<StackGroup["accent"], string> = {
  cyan: "bg-cyan shadow-[0_0_12px_var(--color-cyan)]",
  violet: "bg-violet shadow-[0_0_12px_var(--color-violet)]",
  rose: "bg-rose shadow-[0_0_12px_var(--color-rose)]",
  frost: "bg-frost shadow-[0_0_12px_var(--color-frost)]",
};

export function TechStack() {
  return (
    <section aria-labelledby="stack" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="stack" title="What I work with">
        The languages and tools I reach for, from the browser down to deployment.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-6">
        {/* Languages gets the full-width tile; the other three share the row below. */}
        {techStack.map((group, i) => (
          <Glass as="article" key={group.title} className={`p-6 sm:p-7 ${i === 0 ? "md:col-span-6" : "md:col-span-2"}`}>
            <h3 className="flex items-center gap-3 text-lg font-medium">
              <span aria-hidden className={`size-2 rounded-full ${accentDot[group.accent]}`} />
              {group.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="glass-pill px-3.5 py-1.5 text-sm text-frost/90">
                  {item}
                </li>
              ))}
            </ul>
          </Glass>
        ))}
      </div>
    </section>
  );
}
