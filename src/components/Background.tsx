/**
 * Fixed backdrop the glass refracts: three blurred aurora fields plus a faint
 * grid for the "cyber" texture. Pure CSS, so it stays a server component.
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora absolute -left-[10%] -top-[15%] h-[60vmax] w-[60vmax] rounded-full bg-violet/35 blur-[120px]" />
      <div className="aurora absolute -right-[15%] top-[20%] h-[50vmax] w-[50vmax] rounded-full bg-cyan/25 blur-[120px] [animation-delay:-9s]" />
      <div className="aurora absolute -bottom-[20%] left-[20%] h-[45vmax] w-[45vmax] rounded-full bg-rose/20 blur-[130px] [animation-delay:-17s]" />
      {/* Grid lines fade out toward the edges via a radial mask. */}
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
    </div>
  );
}
