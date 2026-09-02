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
      ? "relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden bg-neutral-900"
      : "relative aspect-video w-full overflow-hidden bg-neutral-900";

  return (
    <div>
      {video.label && <p className="kicker mb-2">{video.label}</p>}
      <div className={frameClass}>
        <iframe
          src={`${video.embedUrl}?rel=0`}
          title={video.label ?? title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <a
        href={video.watchUrl}
        target="_blank"
        rel="noreferrer"
        className="link-line mt-2.5 inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-accent-700"
      >
        Watch on YouTube
      </a>
    </div>
  );
}
