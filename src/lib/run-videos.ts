type RunVideoEntry = {
  youtubeId: string;
  label?: string;
};

export type RunVideo = {
  youtubeId: string;
  label?: string;
  embedUrl: string;
  watchUrl: string;
};

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function parseRunVideos(raw: Record<string, unknown>): Record<string, RunVideo> {
  const out: Record<string, RunVideo> = {};

  for (const [runId, value] of Object.entries(raw)) {
    if (runId.startsWith("_") || !value || typeof value !== "object") continue;
    const entry = value as RunVideoEntry;
    if (!entry.youtubeId) continue;
    out[runId] = {
      youtubeId: entry.youtubeId,
      label: entry.label,
      embedUrl: youtubeEmbedUrl(entry.youtubeId),
      watchUrl: youtubeWatchUrl(entry.youtubeId),
    };
  }

  return out;
}
