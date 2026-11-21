import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 px-5 text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition",
        variant === "primary"
          ? "bg-lime text-ink hover:bg-lime-deep"
          : "border border-line text-ink hover:border-lime hover:text-lime",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
