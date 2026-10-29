"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Render as a different block element for semantics. */
  as?: "div" | "article" | "section" | "aside";
}

/**
 * A liquid-glass surface (see `.glass` in globals.css). Tracks the pointer and
 * writes its position to --mx / --my so the specular highlight follows it.
 * Writes go straight to the DOM style, so moving the pointer never re-renders.
 */
export function Glass({ as: Tag = "div", className = "", onPointerMove, ...rest }: GlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }
    onPointerMove?.(e);
  }

  return <Tag ref={ref} className={`glass ${className}`} onPointerMove={handlePointerMove} {...rest} />;
}
