import Image from "next/image";
import { displayHost } from "@/lib/utils";

type MockupProps = {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

export function ProjectBrowserMockup({
  src,
  alt,
  url,
  priority = false,
  className = "",
  imageClassName = "",
}: MockupProps) {
  return (
    <div className={`overflow-hidden border border-line bg-surface shadow-[0_28px_70px_rgba(91,70,245,0.16)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-lime" />
          <i className="size-2.5 rounded-full bg-sun" />
          <i className="size-2.5 rounded-full bg-sky" />
        </span>
        <span className="truncate font-mono text-[11px] text-muted">{displayHost(url)}</span>
      </div>
      <div className={`relative aspect-[1440/960] overflow-hidden bg-surface ${imageClassName}`}>
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover object-top transition duration-700 group-hover:scale-[1.035]"
          />
        ) : (
          <ScreenshotSlot label={alt} />
        )}
      </div>
    </div>
  );
}

export function MobilePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-[9.5rem] overflow-hidden rounded-[1.6rem] border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:w-[11rem]">
      <div className="relative aspect-[390/844] bg-surface">
        {src ? (
          <Image src={src} alt={alt} fill sizes="180px" className="object-cover object-top" />
        ) : (
          <ScreenshotSlot label="Mobile screenshot" />
        )}
      </div>
    </div>
  );
}

export function ScreenshotSlot({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-48 flex-col justify-between bg-[linear-gradient(160deg,#ffe3f4,#e5f7ff)] p-6">
      <p className="font-mono text-[11px] tracking-[0.18em] text-lime uppercase">Screenshot slot</p>
      <p className="max-w-xs font-display text-3xl leading-none tracking-tight">{label}</p>
      <p className="text-sm text-muted">16:10 desktop or 9:19 mobile. Replace this frame from the admin.</p>
    </div>
  );
}
