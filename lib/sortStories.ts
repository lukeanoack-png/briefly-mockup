import { Article, Interest } from "./types";

export interface RankedStory {
  interest: Interest;
  article: Article;
}

/** Orders articles by the user's current interest ranking. Interests with
 * no matching article (or articles whose interest was removed) are
 * dropped, so the newsletter never shows an orphaned story. Extracted as a
 * pure function so it's testable without rendering the page. */
export function buildRankedStories(
  interests: Interest[],
  articles: Article[]
): RankedStory[] {
  return [...interests]
    .sort((a, b) => a.rank - b.rank)
    .map((interest) => ({
      interest,
      article: articles.find((a) => a.interestId === interest.id),
    }))
    .filter((s): s is RankedStory => Boolean(s.article));
}
