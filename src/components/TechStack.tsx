import { techStack } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TechStack() {
  return (
    <section aria-labelledby="stack" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
      <SectionHeading id="stack" title="Tech stack">
        The languages and tools I reach for, from the browser down to deployment.
      </SectionHeading>

      <dl className="mt-8 grid gap-3">
        {techStack.map((group, i) => (
          // Reveal renders the <div> that wraps each dt/dd pair, so the list markup stays valid.
          <Reveal key={group.title} delay={i * 0.06} className="tile flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
            <dt className="w-28 shrink-0 text-slate">{group.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-chip px-3.5 py-1.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 hover:bg-line"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
