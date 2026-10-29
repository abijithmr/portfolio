import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <h2 id={id} className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-2 text-slate">{children}</p>}
    </Reveal>
  );
}
