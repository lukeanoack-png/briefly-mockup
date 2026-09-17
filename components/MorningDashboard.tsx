import { DataEnvelope, MarketQuote, Weather, WatchlistItem } from "@/lib/types";
import WeatherCard from "@/components/WeatherCard";
import MarketSnapshot from "@/components/MarketSnapshot";

export default function MorningDashboard({
  weather,
  market,
  watchlist,
  onWatchlistChange,
}: {
  weather: DataEnvelope<Weather> | null;
  market: DataEnvelope<MarketQuote[]> | null;
  watchlist: WatchlistItem[];
  onWatchlistChange: (next: WatchlistItem[]) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <WeatherCard envelope={weather} />
      <MarketSnapshot
        envelope={market}
        watchlist={watchlist}
        onWatchlistChange={onWatchlistChange}
      />
    </div>
  );
}
