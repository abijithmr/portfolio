import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 id={id} className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-3 text-lg leading-relaxed text-mist">{children}</p>}
    </div>
  );
}
