// Core data model for the Briefly prototype.
//
// TODO(production): these shapes are designed to survive the move from
// hardcoded/local-API prototype data to a real database + services layer.
// Ranked interests, watchlists, and daily utilities are modeled as three
// distinct preference categories so new categories (e.g. crypto watchlists,
// sports-team follows) can be added without restructuring the frontend.

export interface Interest {
  id: string;
  name: string;
  rank: number; // 1 = highest priority. Lower renders larger/first.
}

export interface WatchlistItem {
  symbol: string;
  companyName: string;
}

export interface User {
  id: string;
  name: string;
  location: string; // display label, e.g. "Lexington, Virginia"
  interests: Interest[];
  watchlist: WatchlistItem[];
}

export interface MarketQuote {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  fetchedAt: string; // ISO timestamp
}

export interface Weather {
  location: string;
  temperature: number;
  high: number;
  low: number;
  condition: string;
  precipitationProbability: number;
  blurb: string;
}

/** Wraps any externally-sourced data with provenance so the UI can never
 * mislabel sample data as live, and so a production data source can be
 * swapped in behind the same envelope. */
export interface DataEnvelope<T> {
  data: T;
  isLive: boolean;
  source: string; // e.g. "Open-Meteo" or "Sample data"
  fetchedAt: string;
}

export interface Article {
  id: string;
  interestId: string;
  headline: string;
  source: string;
  sourceUrl: string;
  publishedAt: string; // ISO date, or "" if unknown
  imageUrl: string | null;
  summary: string[]; // paragraphs
  whyItMatters: string;
  keyTakeaways: string[];
  /** Whether this content was verifiably reconstructed from the live
   * publisher page/corroborating reporting, or is a clearly-labeled mock
   * built only from the supplied URL/title because the source page could
   * not be programmatically accessed. */
  contentStatus: "sourced" | "mock";
}
