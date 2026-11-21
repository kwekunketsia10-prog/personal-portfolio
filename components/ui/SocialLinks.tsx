import type { Profile } from "@/lib/types";
import { whatsappHref } from "@/lib/utils";

export function SocialLinks({
  profile,
  className = "",
  tone = "default",
}: {
  profile: Profile;
  className?: string;
  tone?: "default" | "light";
}) {
  const items = [
    profile.githubUrl ? { href: profile.githubUrl, label: "GitHub" } : null,
    profile.linkedinUrl ? { href: profile.linkedinUrl, label: "LinkedIn" } : null,
    profile.email ? { href: `mailto:${profile.email}`, label: "Email" } : null,
    profile.whatsapp ? { href: whatsappHref(profile.whatsapp), label: "WhatsApp" } : null,
  ].filter((item): item is { href: string; label: string } => Boolean(item));

  if (!items.length) return null;

  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className={`font-mono text-xs tracking-[0.16em] uppercase ${tone === "light" ? "text-background/70 hover:text-background" : "text-muted hover:text-lime"}`}
            {...(item.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
