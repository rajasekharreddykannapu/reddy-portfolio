type RunVideoProps = {
  video: {
    youtubeId: string;
    label?: string;
    embedUrl: string;
    watchUrl: string;
  };
  title: string;
  /** Shorts are vertical; standard videos are 16:9. */
  aspect?: "short" | "wide";
};

export default function RunVideo({ video, title, aspect = "short" }: RunVideoProps) {
  const frameClass =
    aspect === "short"
      ? "relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-xl border border-border bg-black"
      : "relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-black";

  return (
    <div>
      {video.label && (
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted">
          {video.label}
        </p>
      )}
      <div className={frameClass}>
        <iframe
          src={`${video.embedUrl}?rel=0`}
          title={video.label ?? title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <a
        href={video.watchUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        Watch on YouTube
      </a>
    </div>
  );
}
