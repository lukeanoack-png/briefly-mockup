import { NextRequest, NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/services/market";
import { WatchlistItem } from "@/lib/types";

// Accepts the caller's current watchlist (from localStorage) as a JSON
// query param so an edited watchlist is reflected without a server round
// trip through a database. TODO(production): read the watchlist from the
// user's saved record instead of trusting client input.
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols");
  let watchlist: WatchlistItem[];
  try {
    watchlist = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(watchlist)) throw new Error("not an array");
  } catch {
    return NextResponse.json({ error: "invalid symbols param" }, { status: 400 });
  }

  const envelope = await getMarketSnapshot(watchlist);
  return NextResponse.json(envelope);
}
