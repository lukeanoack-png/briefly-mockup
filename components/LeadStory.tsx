import { Article, Interest } from "@/lib/types";
import TopicArt from "@/components/TopicArt";
import SourceAttribution from "@/components/SourceAttribution";

export default function LeadStory({
  article,
  interest,
}: {
  article: Article;
  interest: Interest;
}) {
  return (
    <article className="mt-10 pt-8 border-t-2 border-ink">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        <span>{interest.name}</span>
        <span className="text-ink/30">·</span>
        <span className="text-ink/50">Priority #{interest.rank}</span>
      </div>

      <h2 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight text-ink text-balance">
        {article.headline}
      </h2>

      <div className="mt-3">
        <SourceAttribution article={article} />
      </div>

      <div className="mt-5">
        <TopicArt topic={interest.name} interestId={interest.id} size="large" />
      </div>

      <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink/85 max-w-[64ch]">
        {article.summary.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-5 bg-ink/[0.04] border-l-2 border-accent px-4 py-3 max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Why this matters
        </div>
        <p className="mt-1 text-sm text-ink/80 leading-relaxed">
          {article.whyItMatters}
        </p>
      </div>

      <div className="mt-5 max-w-[64ch]">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink/60">
          Key takeaways
        </div>
        <ul className="mt-2 space-y-1.5">
          {article.keyTakeaways.map((point, i) => (
            <li key={i} className="text-sm text-ink/80 flex gap-2">
              <span className="text-accent">—</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block border border-ink px-5 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-paper transition-colors"
      >
        Read original →
      </a>
    </article>
  );
}
