import { test } from "node:test";
import assert from "node:assert/strict";
import { articles } from "../data/articles";
import { currentUser } from "../data/user";

test("all four supplied stories are present", () => {
  assert.equal(articles.length, 4);
});

test("every article has a valid, non-empty source URL", () => {
  for (const article of articles) {
    assert.match(
      article.sourceUrl,
      /^https:\/\//,
      `${article.id} should have an https source URL`
    );
  }
});

test("every article maps to one of the user's interests", () => {
  const interestIds = new Set(currentUser.interests.map((i) => i.id));
  for (const article of articles) {
    assert.ok(
      interestIds.has(article.interestId),
      `${article.id} references unknown interest "${article.interestId}"`
    );
  }
});

test("every interest has a unique rank starting at 1", () => {
  const ranks = currentUser.interests.map((i) => i.rank).sort((a, b) => a - b);
  assert.deepEqual(ranks, [1, 2, 3, 4]);
});

test("mock content is clearly labeled and never presented as sourced fact", () => {
  const mockArticles = articles.filter((a) => a.contentStatus === "mock");
  for (const article of mockArticles) {
    assert.match(article.summary[0], /\[MOCK/);
  }
  const sourced = articles.filter((a) => a.contentStatus === "sourced");
  for (const article of sourced) {
    assert.doesNotMatch(article.summary[0], /\[MOCK/);
  }
});

test("the watchlist contains the five specified equities", () => {
  const symbols = currentUser.watchlist.map((w) => w.symbol).sort();
  assert.deepEqual(symbols, ["AAPL", "META", "NVDA", "TSLA", "TSM"]);
});
