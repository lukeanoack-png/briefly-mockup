import { Article } from "@/lib/types";

function formatDate(publishedAt: string): string {
  if (!publishedAt) return "Date unavailable";
  const d = new Date(publishedAt + "T00:00:00");
  if (isNaN(d.getTime())) return publishedAt;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function SourceAttribution({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/55">
      <span className="font-semibold text-ink/70">{article.source}</span>
      <span aria-hidden>·</span>
      <span>{formatDate(article.publishedAt)}</span>
      <span aria-hidden>·</span>
      <span className="uppercase tracking-wide text-accent/80 font-medium">
        AI Summary
      </span>
      {article.contentStatus === "mock" && (
        <span className="uppercase tracking-wide text-loss/80 font-medium">
          · Sample content — edit me
        </span>
      )}
      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center gap-1 text-accent font-medium hover:underline"
      >
        Read original ↗
      </a>
    </div>
  );
}
