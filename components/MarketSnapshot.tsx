"use client";

import { useState } from "react";
import { DataEnvelope, MarketQuote, WatchlistItem } from "@/lib/types";
import StockQuote from "@/components/StockQuote";
import EditWatchlistModal from "@/components/EditWatchlistModal";

export default function MarketSnapshot({
  envelope,
  watchlist,
  onWatchlistChange,
}: {
  envelope: DataEnvelope<MarketQuote[]> | null;
  watchlist: WatchlistItem[];
  onWatchlistChange: (next: WatchlistItem[]) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border border-rule bg-white/40 p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-[0.14em] text-ink/50 font-semibold">
          Market Snapshot
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-[11px] text-accent hover:underline"
        >
          + Edit watchlist
        </button>
      </div>

      {!envelope ? (
        <div className="mt-2 space-y-3 animate-pulse">
          {watchlist.map((w) => (
            <div key={w.symbol} className="h-8 bg-ink/10" />
          ))}
        </div>
      ) : envelope.data.length === 0 ? (
        <p className="mt-3 text-sm text-ink/50">
          No tickers on your watchlist yet.
        </p>
      ) : (
        <div className="mt-1">
          {envelope.data.map((q) => (
            <StockQuote key={q.symbol} quote={q} />
          ))}
        </div>
      )}

      <div className="mt-auto pt-3 text-[11px] text-ink/40">
        Change vs. previous close · Source: {envelope?.source ?? "…"}{" "}
        {envelope ? (envelope.isLive ? "· Live" : "· Sample data") : ""}
      </div>

      {showModal && (
        <EditWatchlistModal
          watchlist={watchlist}
          onSave={onWatchlistChange}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
