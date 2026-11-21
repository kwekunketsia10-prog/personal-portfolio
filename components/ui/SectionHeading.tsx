import type { ReactNode } from "react";

export function SectionHeading({
  index,
  title,
  children,
}: {
  index?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {index ? (
        <p className="font-mono text-xs tracking-[0.22em] text-lime uppercase">{index}</p>
      ) : null}
      <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5.2rem)] leading-[0.94] tracking-[-0.045em] text-ink">
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
