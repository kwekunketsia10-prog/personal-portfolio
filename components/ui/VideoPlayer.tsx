type VideoPlayerProps = {
  src: string;
  poster?: string;
  captions?: string;
  autoPlay?: boolean;
};

export function VideoPlayer({ src, poster, captions, autoPlay = false }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden border border-line bg-black">
      <video
        className="aspect-video w-full"
        controls
        playsInline
        preload="metadata"
        poster={poster || undefined}
        muted={autoPlay}
        autoPlay={autoPlay}
      >
        <source src={src} />
        {captions ? <track kind="captions" src={captions} srcLang="en" label="English" default /> : null}
      </video>
    </div>
  );
}
