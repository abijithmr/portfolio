import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <div className="reveal max-w-2xl">
      <h2 id={id} className="text-3xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      {children && <p className="mt-2 text-slate">{children}</p>}
    </div>
  );
}
