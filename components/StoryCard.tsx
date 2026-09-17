import { Article, Interest } from "@/lib/types";
import TopicArt from "@/components/TopicArt";
import SourceAttribution from "@/components/SourceAttribution";

export default function StoryCard({
  article,
  interest,
}: {
  article: Article;
  interest: Interest;
}) {
  return (
    <article className="py-6 border-b border-rule last:border-b-0 grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-4">
      <div className="sm:h-28">
        <TopicArt topic={interest.name} interestId={interest.id} size="small" />
      </div>

      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span>{interest.name}</span>
          <span className="text-ink/30">·</span>
          <span className="text-ink/50">Priority #{interest.rank}</span>
        </div>

        <h3 className="mt-1 font-serif text-xl leading-snug text-ink text-balance">
          {article.headline}
        </h3>

        <p className="mt-2 text-sm text-ink/75 leading-relaxed">
          {article.summary[0]}
        </p>

        <div className="mt-2 text-xs text-ink/70">
          <span className="font-semibold uppercase tracking-wide text-ink/50">
            Why it matters:{" "}
          </span>
          {article.whyItMatters}
        </div>

        <ul className="mt-2 space-y-1">
          {article.keyTakeaways.slice(0, 2).map((point, i) => (
            <li key={i} className="text-xs text-ink/70 flex gap-1.5">
              <span className="text-accent">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <SourceAttribution article={article} />
        </div>
      </div>
    </article>
  );
}
