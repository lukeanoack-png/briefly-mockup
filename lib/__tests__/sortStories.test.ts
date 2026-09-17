import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRankedStories } from "../sortStories";
import { Article, Interest } from "../types";

const interests: Interest[] = [
  { id: "a", name: "A", rank: 2 },
  { id: "b", name: "B", rank: 1 },
  { id: "c", name: "C", rank: 3 },
];

function makeArticle(interestId: string): Article {
  return {
    id: `${interestId}-1`,
    interestId,
    headline: `Headline for ${interestId}`,
    source: "Test Source",
    sourceUrl: "https://example.com/article",
    publishedAt: "2026-01-01",
    imageUrl: null,
    summary: ["Paragraph one."],
    whyItMatters: "Because.",
    keyTakeaways: ["Point one"],
    contentStatus: "sourced",
  };
}

test("orders stories by interest rank, not input order", () => {
  const articles = [makeArticle("a"), makeArticle("b"), makeArticle("c")];
  const result = buildRankedStories(interests, articles);
  assert.deepEqual(
    result.map((s) => s.interest.id),
    ["b", "a", "c"]
  );
});

test("changing rank order changes story order", () => {
  const articles = [makeArticle("a"), makeArticle("b"), makeArticle("c")];
  const reordered = interests.map((i) =>
    i.id === "a" ? { ...i, rank: 1 } : i.id === "b" ? { ...i, rank: 2 } : i
  );
  const result = buildRankedStories(reordered, articles);
  assert.deepEqual(
    result.map((s) => s.interest.id),
    ["a", "b", "c"]
  );
});

test("drops interests with no matching article instead of crashing", () => {
  const articles = [makeArticle("a")];
  const result = buildRankedStories(interests, articles);
  assert.deepEqual(
    result.map((s) => s.interest.id),
    ["a"]
  );
});

test("returns an empty list when there are no interests", () => {
  const result = buildRankedStories([], [makeArticle("a")]);
  assert.deepEqual(result, []);
});
