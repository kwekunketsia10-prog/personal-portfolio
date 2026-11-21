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
      <h2 className="mt-3 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[0.96] tracking-[-0.045em] text-ink">
        {title}
      </h2>
      {children ? <div className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
