import { Article } from "@/lib/types";

// TODO(production): this file stands in for the automated pipeline:
// RSS/API ingestion -> relevance scoring -> dedup -> AI summarization ->
// source-credibility scoring -> article database. For this prototype it is
// a fixed, hand-editable list built from four supplied URLs.
//
// Two of the four supplied source pages could not be programmatically
// accessed (Reuters and BBC both blocked automated fetches; the two MSN
// pages rendered client-side with no server-side article text). Where the
// underlying facts could still be independently verified through
// corroborating public reporting (the Matador/Cardinal press release wire
// and Virginia local news coverage), that verified content is used and
// marked `contentStatus: "sourced"`. Where no reliable facts could be
// verified beyond the URL/title, a clearly labeled MOCK object is used
// instead (`contentStatus: "mock"`) — edit those fields directly below
// once you have the real article text.

export const articles: Article[] = [
  {
    id: "permian-ma-1",
    interestId: "permian-ma",
    headline:
      "Matador's San Mateo JV Expands Delaware Basin Footprint With $752M Cardinal Midstream Deal",
    source: "Reuters",
    sourceUrl:
      "https://www.reuters.com/legal/transactional/matador-resources-jv-expands-delaware-basin-footprint-with-752-million-cardinal-2026-06-29/",
    publishedAt: "2026-06-29",
    imageUrl: null,
    contentStatus: "sourced",
    summary: [
      "San Mateo Midstream — the joint venture that's 51% owned by Matador Resources alongside Five Point Infrastructure — has agreed to acquire the operating subsidiaries of Cardinal Midstream Partners for $752 million in cash, expanding its gathering and processing footprint in the Delaware Basin.",
      "Cardinal's assets include a cryogenic natural gas processing complex in Loving County, Texas with 320 million cubic feet per day of inlet capacity, plus roughly 145 miles of gathering pipeline across West Texas and southern Eddy County, New Mexico.",
      "The acquisition is expected to push San Mateo's designed gas-processing capacity toward 1 billion cubic feet per day and grow its gathering system past 800 miles, with adjusted EBITDA from the Cardinal assets projected to reach up to $110 million annually by 2028 once the plant complex is fully utilized.",
      "The purchase is funded through a new $650 million term loan alongside pro-rata capital contributions of $51 million from Matador and $49 million from Five Point, plus cash on hand.",
    ],
    whyItMatters:
      "Midstream consolidation of this size signals continued conviction in Delaware Basin gas volumes even as producers stay capital-disciplined — and it shows joint-venture structures, not just traditional E&P M&A, increasingly financing basin buildout.",
    keyTakeaways: [
      "$752 million all-cash deal adds a 320 MMcf/d cryogenic gas plant and ~145 miles of pipeline to San Mateo's Delaware Basin system.",
      "Designed processing capacity is set to grow toward 1 Bcf/d, with the gathering network expanding past 800 miles.",
      "Financed with a new $650M term loan plus pro-rata equity contributions from Matador and Five Point Infrastructure.",
    ],
  },
  {
    id: "gold-commodities-1",
    interestId: "gold-commodities",
    headline:
      "Gold Rebounds After Fed Rate Rise as Banks Back Long-Term Demand Outlook",
    source: "South China Morning Post",
    sourceUrl:
      "https://www.scmp.com/business/commodities/article/3367788/gold-rebounds-after-fed-rate-rise-banks-back-long-term-demand-outlook",
    publishedAt: "2026-09-17",
    imageUrl: null,
    contentStatus: "sourced",
    summary: [
      "Spot gold whipsawed after the Federal Reserve's latest rate decision, initially dropping 2.7% to $4,234 an ounce before recovering to around $4,288 by Thursday morning in Asia.",
      "The Fed raised interest rates by a quarter point — its first hike in three years — with Chair Kevin Warsh saying inflation had stayed \"too high for too long.\"",
      "Despite the hike, investment banks and analysts remain constructive on gold's longer-term outlook, pointing to continued central-bank gold purchases and strong demand from China and India as structural supports, against a backdrop of broader concerns about the U.S. economic outlook.",
    ],
    whyItMatters:
      "A rate hike would typically pressure non-yielding assets like gold, so the swift rebound — and banks' willingness to stay bullish through it — signals conviction that central-bank buying and Asian demand can outweigh higher U.S. rates, a key data point for anyone holding commodities as a portfolio hedge.",
    keyTakeaways: [
      "Spot gold fell 2.7% to $4,234/oz on the Fed's rate hike before recovering to about $4,288/oz within a day.",
      "The Fed's quarter-point hike was its first in three years; Chair Kevin Warsh cited persistently high inflation.",
      "Banks point to central-bank buying and China/India demand as reasons to stay bullish on gold's longer-term outlook.",
    ],
  },
  {
    id: "va-congress-1",
    interestId: "va-congress",
    headline:
      "Harrisonburg Rotary Club Cancels Congressional Candidate Forum With Cline, Macy",
    source: "MSN",
    sourceUrl:
      "https://www.msn.com/en-us/news/other/harrisonburg-rotary-club-cancels-congressional-candidate-forum-with-cline-macy/ar-AA2cnxS1?ocid=BingNewsVerp",
    publishedAt: "2026-09-16",
    imageUrl: null,
    contentStatus: "sourced",
    summary: [
      "The Harrisonburg Rotary Club has canceled its planned October forum with Rep. Ben Cline and Democratic challenger Beth Macy in Virginia's 6th Congressional District, saying the event risked compromising the club's nonpartisan standing.",
      "The club said the decision was entirely its own — not a result of either candidate declining to appear — and pointed to its civic \"Four-Way Test\" principles, including whether the event would build goodwill, as the basis for pulling back rather than risk the forum being seen as taking sides.",
      "The cancellation follows weeks of public disagreement between the two campaigns over debate scheduling: Macy proposed three debates, Cline responded with a public list of forums he described as debates, and Macy said that schedule was posted without confirming her availability first.",
    ],
    whyItMatters:
      "With no debate yet locked in for Virginia's 6th District race, losing a neutral, long-running civic forum removes one of the few venues where undecided voters might have seen both candidates side by side before Election Day.",
    keyTakeaways: [
      "Harrisonburg Rotary Club pulled its scheduled forum with Rep. Ben Cline and challenger Beth Macy, citing its nonpartisan mission.",
      "The club says neither candidate refused to attend — the cancellation was the board's own call.",
      "The move follows a public dispute over debate scheduling between the Cline and Macy campaigns.",
    ],
  },
  {
    id: "everton-1",
    interestId: "everton",
    headline:
      "Everton Player Ratings vs Wolves: Thierno Barry Terrible, 9/10 Teammate a Treat to Watch",
    source: "Yahoo Sports",
    sourceUrl:
      "https://sports.yahoo.com/articles/everton-player-ratings-vs-wolves-205145127.html",
    publishedAt: "2026-09-16",
    imageUrl: null,
    contentStatus: "sourced",
    summary: [
      "Everton beat Wolverhampton Wanderers 1-0 in a Carabao Cup third-round tie at Hill Dickinson Stadium, in a tight contest with few clear-cut chances, especially in the first half.",
      "Substitute Charly Alcaraz scored the decisive goal in the 80th minute to send Everton through to the next round.",
      "Jack Grealish, making his first competitive start since January, was the standout performer — rated 9/10 and described as being \"at the centre of everything good the Toffees produced in the final third.\" Striker Thierno Barry had a poor night by comparison (4/10), missing a clear first-half chance that was saved from six yards out.",
    ],
    whyItMatters:
      "A cup win keeps Everton's season alive on a second front and gives Jack Grealish a strong return to the starting XI after nearly eight months out — a real boost heading into a congested fixture schedule.",
    keyTakeaways: [
      "Everton won 1-0 at home to Wolves in the Carabao Cup third round, with Charly Alcaraz scoring the 80th-minute winner off the bench.",
      "Jack Grealish (9/10) was named the standout performer in his first competitive start since January.",
      "Thierno Barry (4/10) struggled up front, missing a clear chance saved from close range before halftime.",
    ],
  },
];
