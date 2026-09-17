"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { WatchlistItem } from "@/lib/types";

export default function EditWatchlistModal({
  watchlist,
  onSave,
  onClose,
}: {
  watchlist: WatchlistItem[];
  onSave: (next: WatchlistItem[]) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<WatchlistItem[]>(watchlist);
  const [symbol, setSymbol] = useState("");
  const [company, setCompany] = useState("");

  const remove = (sym: string) => setItems(items.filter((i) => i.symbol !== sym));

  const add = () => {
    const s = symbol.trim().toUpperCase();
    if (!s || items.some((i) => i.symbol === s)) return;
    setItems([...items, { symbol: s, companyName: company.trim() || s }]);
    setSymbol("");
    setCompany("");
  };

  return (
    <Modal title="Edit watchlist" onClose={onClose}>
      <ul className="divide-y divide-rule">
        {items.map((item) => (
          <li key={item.symbol} className="flex items-center justify-between py-2">
            <div>
              <span className="font-semibold text-sm text-ink">{item.symbol}</span>
              <span className="ml-2 text-sm text-ink/60">{item.companyName}</span>
            </div>
            <button
              onClick={() => remove(item.symbol)}
              aria-label={`Remove ${item.symbol}`}
              className="text-ink/40 hover:text-loss text-sm px-2"
            >
              ×
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="py-3 text-sm text-ink/50">No tickers on your watchlist.</li>
        )}
      </ul>

      <div className="mt-4 flex gap-2">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Ticker (e.g. MSFT)"
          className="w-1/2 border border-rule px-2 py-1.5 text-sm bg-white"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
          className="w-1/2 border border-rule px-2 py-1.5 text-sm bg-white"
        />
      </div>
      <button
        onClick={add}
        className="mt-2 w-full border border-ink/20 text-sm py-1.5 text-ink hover:bg-ink/5"
      >
        + Add ticker
      </button>

      <button
        onClick={() => {
          onSave(items);
          onClose();
        }}
        className="mt-4 w-full bg-ink text-paper text-sm py-2 hover:bg-ink/90"
      >
        Save watchlist
      </button>
    </Modal>
  );
}
