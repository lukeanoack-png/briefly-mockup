import { MarketQuote } from "@/lib/types";

export default function StockQuote({ quote }: { quote: MarketQuote }) {
  const isUp = quote.changePercent > 0;
  const isDown = quote.changePercent < 0;
  const colorClass = isUp ? "text-gain" : isDown ? "text-loss" : "text-ink/60";
  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-rule last:border-b-0">
      <div>
        <div className="font-semibold text-sm text-ink">{quote.symbol}</div>
        <div className="text-xs text-ink/50">{quote.companyName}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-ink tabular-nums">
          ${quote.price.toFixed(2)}
        </div>
        <div className={`text-xs tabular-nums ${colorClass}`}>
          {arrow} {Math.abs(quote.changePercent).toFixed(2)}%
          <span className="text-ink/40 ml-1">
            ({isUp ? "+" : isDown ? "-" : ""}${Math.abs(quote.change).toFixed(2)})
          </span>
        </div>
      </div>
    </div>
  );
}
