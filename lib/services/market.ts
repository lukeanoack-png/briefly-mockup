import { DataEnvelope, MarketQuote, WatchlistItem } from "@/lib/types";

// TODO(production): swap this for a licensed market-data provider
// (e.g. IEX Cloud, Polygon, Alpaca) with proper rate limiting, caching,
// and error budgets. Yahoo Finance's public chart endpoint is free and
// keyless, which is why it's used for this prototype, but it is an
// unofficial/undocumented endpoint and not appropriate for production use.

const SAMPLE_QUOTES: Record<string, Omit<MarketQuote, "companyName" | "fetchedAt">> = {
  AAPL: { symbol: "AAPL", price: 241.35, change: 2.96, changePercent: 1.24, previousClose: 238.39 },
  NVDA: { symbol: "NVDA", price: 182.17, change: -1.16, changePercent: -0.63, previousClose: 183.33 },
  META: { symbol: "META", price: 612.4, change: 4.85, changePercent: 0.8, previousClose: 607.55 },
  TSLA: { symbol: "TSLA", price: 256.72, change: -3.41, changePercent: -1.31, previousClose: 260.13 },
  TSM: { symbol: "TSM", price: 198.06, change: 1.02, changePercent: 0.52, previousClose: 197.04 },
};

async function fetchOne(item: WatchlistItem): Promise<MarketQuote> {
  const res = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${item.symbol}`,
    { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error(`Yahoo Finance responded ${res.status}`);
  const json = await res.json();
  const meta = json?.chart?.result?.[0]?.meta;
  if (!meta || typeof meta.regularMarketPrice !== "number") {
    throw new Error("Unexpected Yahoo Finance payload shape");
  }

  const price = meta.regularMarketPrice;
  const previousClose = meta.previousClose ?? meta.chartPreviousClose;
  const change = price - previousClose;
  const changePercent = previousClose ? (change / previousClose) * 100 : 0;

  return {
    symbol: item.symbol,
    companyName: item.companyName,
    price,
    change,
    changePercent,
    previousClose,
    fetchedAt: new Date().toISOString(),
  };
}

/** Fetches live quotes for the given watchlist. If ANY quote fails, the
 * whole snapshot falls back to sample data — the market strip should never
 * show a mix of live and sample prices without saying so. */
export async function getMarketSnapshot(
  watchlist: WatchlistItem[]
): Promise<DataEnvelope<MarketQuote[]>> {
  try {
    const quotes = await Promise.all(watchlist.map(fetchOne));
    return {
      data: quotes,
      isLive: true,
      source: "Yahoo Finance",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    const fetchedAt = new Date().toISOString();
    const quotes: MarketQuote[] = watchlist.map((item) => {
      const sample = SAMPLE_QUOTES[item.symbol] ?? {
        symbol: item.symbol,
        price: 100,
        change: 0,
        changePercent: 0,
        previousClose: 100,
      };
      return { ...sample, companyName: item.companyName, fetchedAt };
    });
    return {
      data: quotes,
      isLive: false,
      source: "Sample data",
      fetchedAt,
    };
  }
}
