import { MessageCircle } from "lucide-react";
import type { Profile } from "@/lib/types";
import { whatsappHref } from "@/lib/utils";

export function WhatsAppButton({ profile }: { profile: Profile }) {
  const href = whatsappHref(profile.whatsapp);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-lime text-background shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-ink sm:right-6 sm:bottom-6"
    >
      <MessageCircle size={22} />
    </a>
  );
}
