# Briefly — Personalized Daily Newsletter (Prototype)

A working prototype of a personalized, AI-generated daily newsletter and
"morning homepage." It combines ranked personal news interests, a
watchlist-driven market snapshot, local weather, and a placeholder daily
game into one editorial-style briefing for a fictional subscriber, **Billy**.

This is a **frontend-and-data-model prototype**. There is no automated news
discovery, no email delivery, and no database — those are explicitly out of
scope for this stage (see "Future production work" below). The four news
stories are fixed, hand-curated content built from four supplied URLs.

---

## 1. What this is

- A single-page newsletter (`/`) styled like a premium editorial product
  (Financial Times / Morning Brew / Axios influence), not a SaaS dashboard.
- Billy's four ranked interests control which stories appear and in what
  order/prominence — reordering them re-sorts the newsletter live.
- A compact "Morning Dashboard" shows live weather (Lexington, VA) and a
  live market snapshot for Billy's five-stock watchlist.
- A polished placeholder for a future "Daily Game" retention feature.
- Every story is clearly AI-summarized with a prominent "Read original"
  link back to the publisher — no full-article reproduction.

## 2. Install dependencies

Requires Node.js 18.18+ (built and tested on Node 22).

```bash
npm install
```

## 3. Run it locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build (also type-checks)
npm start       # run the production build
npm test        # run the lightweight test suite (see §13)
```

## 4. Current architecture

- **Next.js 16 (App Router) + TypeScript + React 19 + Tailwind CSS.**
- No database. All prototype data lives in local TypeScript modules under
  `lib/data/`.
- Two tiny server API routes (`app/api/weather`, `app/api/market`) wrap the
  external data fetches so the fetching logic is isolated from the UI and
  swappable later. The main page fetches these client-side so the market
  snapshot can refresh when the user edits their watchlist.
- All rendering-only components live in `components/`; there is no
  client-side routing beyond the single page.

```
app/
  page.tsx              — the newsletter page (client component)
  layout.tsx, globals.css
  api/weather/route.ts  — server route wrapping lib/services/weather.ts
  api/market/route.ts   — server route wrapping lib/services/market.ts
components/             — Header, DailyBriefHeader, MorningDashboard,
                           WeatherCard, MarketSnapshot, StockQuote,
                           InterestManager, RankedInterest, LeadStory,
                           StoryCard, SourceAttribution, DailyGame, Footer,
                           TopicArt (image placeholders), Modal + 3 modals
lib/
  types.ts              — the shared data model (User, Interest,
                           WatchlistItem, MarketQuote, Weather, Article,
                           DataEnvelope<T>)
  data/user.ts           — Billy's fixed profile (interests + watchlist)
  data/articles.ts        — the four supplied stories (see §5)
  services/weather.ts     — Open-Meteo fetch + sample-data fallback
  services/market.ts      — Yahoo Finance fetch + sample-data fallback
  sortStories.ts           — pure function: interests + articles -> ordered
                            stories (unit tested, see §13)
  hooks/useLocalStorageState.ts — generic localStorage-backed React state
```

## 5. Where the sample stories are stored, and how to edit one

All four stories live in **`lib/data/articles.ts`** as a plain array of
`Article` objects (shape defined in `lib/types.ts`). To edit a story, open
that file and change any field directly — `headline`, `summary` (an array
of paragraph strings), `whyItMatters`, `keyTakeaways`, `sourceUrl`,
`publishedAt`, etc. Changes appear immediately in dev mode.

Several of the originally-supplied source pages could not be
programmatically fetched:

- The original **Reuters** URL (Permian M&A) and the original **BBC Sport**
  URL (Everton) both blocked automated retrieval.
- Both original **MSN** URLs (Gold & Commodities, Virginia congressional
  race) render their article body client-side, so no article text was
  present in the fetched HTML.
- A follow-up **Economic Times** URL offered as a replacement for Gold &
  Commodities was also blocked, as was its likely syndication partner
  `emkaywealth.com`.

All four stories are currently backed by **independently verified,
real content** (`contentStatus: "sourced"`) — either through corroborating
public reporting for the original URL (Matador's own press release and
BusinessWire filing for the Permian deal; WHSV/Cardinal News local
reporting for the Virginia congressional story), or by successfully
fetching an alternate source for the same underlying topic when the
original/replacement URL was blocked: **Yahoo Sports** for Everton's
Carabao Cup win over Wolves, and the **South China Morning Post** for a
gold-market story (Fed rate hike / gold rebound) after two other Gold &
Commodities sources failed.

Note that the SCMP piece is a different specific article than the
originally-requested "Commodity Talk" op-ed by Dr. Joseph Thomas — it
covers the same interest (Gold & Commodities) with verifiable facts, but
if you specifically want Dr. Thomas's argument, you'll need to paste that
article's text into `lib/data/articles.ts` yourself, since every attempt
to fetch it was blocked.

The `Article.contentStatus` field (`"sourced" | "mock"`) exists precisely
so this can flip back to a clearly labeled **mock** placeholder
(`[MOCK CONTENT]` prefix, "SAMPLE CONTENT — EDIT ME" tag in the UI) any
time a source can't be verified — see `lib/data/articles.ts` for the
pattern. Every field there is plain, hand-editable text.

## 6. How the interest ranking works

Billy's four interests live in `lib/data/user.ts` with a numeric `rank`
(1 = highest priority). On the page:

- The **"Your Interests"** panel (upper right on desktop, stacked below the
  dashboard on mobile) renders them in rank order.
- Drag-and-drop (native HTML5 DnD, no extra library) and ▲/▼ buttons both
  reorder the list; an ✕ removes an interest entirely.
- Reordering immediately re-runs `buildRankedStories()` (`lib/sortStories.ts`),
  which re-sorts the four stories to match — the #1-ranked interest always
  gets the large lead-story treatment, the rest render as smaller cards in
  "More For You," in rank order.
- The full ranking is persisted to `localStorage` (`briefly:interests`), so
  a refresh preserves it. "Reset" restores Billy's original order.
- Removing every article's matching interest is handled gracefully (an
  empty-state message instead of a crash).
- "+ Add interest" opens a placeholder modal — it does not create a working
  interest yet (see TODOs below).

## 7. How weather data works

`lib/services/weather.ts` calls the free, keyless
[Open-Meteo](https://open-meteo.com) forecast API server-side (via
`app/api/weather/route.ts`) for Lexington, VA's hardcoded coordinates. If
the request fails for any reason, it falls back to a hardcoded sample
`Weather` object. Every response is wrapped in a `DataEnvelope<T>` with an
explicit `isLive` boolean and `source` string, and the UI always renders
that label ("Source: Open-Meteo · Live" or "· Sample data") — sample data
is never presented as live.

"Change location" opens a placeholder modal; it doesn't yet persist a new
location (see TODOs).

## 8. How market data works

`lib/services/market.ts` calls Yahoo Finance's public (free, keyless, but
**unofficial/undocumented**) chart endpoint server-side, for whatever
symbols are in the current watchlist. If *any* symbol's fetch fails, the
**entire snapshot** falls back to a hardcoded sample data set — the strip
never mixes live and sample prices silently. Every response carries the
same `DataEnvelope<T>` provenance labeling as weather.

"+ Edit watchlist" opens a fully working modal: add or remove tickers, then
save. The new list is persisted to `localStorage` (`briefly:watchlist`)
and immediately triggers a live re-fetch for the new symbol set.

## 9. Is financial/weather information live or mocked?

**Both are live by default** in this prototype, using free, keyless public
endpoints (Open-Meteo for weather, Yahoo Finance's chart endpoint for
quotes). Both gracefully fall back to clearly labeled sample data if the
network call fails, times out, or returns an unexpected shape — the label
next to each module always tells you which one you're looking at.

## 10. How to change the sample watchlist

Two ways:

1. **At runtime:** click "+ Edit watchlist" on the Market Snapshot module,
   add/remove tickers, and save. This persists to `localStorage`.
2. **In code:** edit the `watchlist` array in `lib/data/user.ts` — this is
   the default a fresh browser (no localStorage yet) will load.

## 11. What would need to be built for a production version

- Automated multi-source news ingestion (RSS/API), not four fixed URLs.
- An AI relevance-scoring + ranking model matching stories to a user's
  ranked interests, plus duplicate-story detection across sources.
- Real AI summarization of full article text (with a legal/licensing
  review of how much publisher content can be reproduced).
- Source-credibility scoring to weight/filter publishers.
- Real user accounts/authentication and a persistence layer (Postgres,
  etc.) replacing `lib/data/*` and `localStorage`.
- A licensed financial market-data provider with proper rate limits and
  an SLA (Yahoo Finance's endpoint here is fine for a prototype, not
  production).
- A geocoding-backed location preference feeding the weather service.
- Newsletter templating for email (HTML email rendering is quite different
  from a responsive web page) and an email delivery provider (SES,
  Postmark, SendGrid, etc.) plus a daily scheduler.
- A real Daily Game (generation, state, and streak persistence).
- Engagement analytics, click tracking, and a feedback loop from reading
  behavior back into interest ranking.

Every one of these has a `TODO(production):` comment at its integration
point in the code (see `lib/services/*.ts`, `lib/data/*.ts`,
`components/DailyGame.tsx`, `components/AddInterestModal.tsx`,
`components/ChangeLocationModal.tsx`).

## 12. Next prototype steps

1. User onboarding and interest creation (replace the "Add interest"
   placeholder with a real flow).
2. Automatic news retrieval (RSS/API ingestion pipeline).
3. A relevance/ranking model to score and select stories per interest.
4. Automated article summarization (real AI summarization of full text).
5. Real-time market-data integration via a licensed provider.
6. Location and weather integration tied to saved user preferences.
7. Email rendering and sending (HTML email templates + a delivery
   provider + a daily scheduler).
8. Database/user accounts (replace `lib/data/*` + localStorage).
9. Daily Game MVP (an actual 2-minute puzzle, with streak persistence).
10. Analytics and a personalization feedback loop.

## 13. Testing

Lightweight tests run on Node's built-in test runner via `tsx`:

```bash
npm test
```

Covers, as pure-logic/data tests (`lib/__tests__/`):

- [x] All four stories render (data-integrity: article count = 4)
- [x] Every story contains a valid (`https://`) source link
- [x] Every article maps to a known interest
- [x] Changing interest rank order changes story order (`sortStories`)
- [x] Interests with no matching article are dropped instead of crashing
- [x] Mock/sample content is clearly labeled, never silently mixed with
      verified content
- [x] The watchlist contains the five specified equities

The remaining behaviors are runtime/UI/browser concerns not worth a full
testing-library setup for a prototype. They were manually verified in
Chrome during development and should be spot-checked after future changes:

- [ ] Drag-and-drop and ▲/▼ reordering visibly reorder the newsletter
- [ ] localStorage preserves the interest ranking and watchlist across a
      refresh ("Reset" restores Billy's defaults)
- [ ] Prices and percentage changes render correctly; gains (green ▲) and
      losses (red ▼) are visually distinguishable
- [ ] The "Live" / "Sample data" label always matches what's actually
      shown (check by temporarily breaking network access)
- [ ] Weather module renders without breaking the page if the API fails
      (verified via the try/catch fallback path)
- [ ] Missing article images never show a broken image icon (verified —
      `TopicArt` is a designed placeholder, never an `<img>`)
- [ ] Mobile layout does not overflow horizontally at ~390px width
- [ ] Editing the watchlist (add/remove) persists and re-fetches quotes

## Product name

"Briefly" is a placeholder product name for this prototype.
