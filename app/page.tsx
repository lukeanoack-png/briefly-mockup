"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import DailyBriefHeader from "@/components/DailyBriefHeader";
import MorningDashboard from "@/components/MorningDashboard";
import InterestManager from "@/components/InterestManager";
import LeadStory from "@/components/LeadStory";
import StoryCard from "@/components/StoryCard";
import DailyGame from "@/components/DailyGame";
import Footer from "@/components/Footer";
import { currentUser } from "@/lib/data/user";
import { articles } from "@/lib/data/articles";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import { buildRankedStories } from "@/lib/sortStories";
import { DataEnvelope, Interest, MarketQuote, Weather, WatchlistItem } from "@/lib/types";

export default function Home() {
  const [interests, setInterests] = useLocalStorageState<Interest[]>(
    "briefly:interests",
    currentUser.interests
  );
  const [watchlist, setWatchlist] = useLocalStorageState<WatchlistItem[]>(
    "briefly:watchlist",
    currentUser.watchlist
  );

  const [weather, setWeather] = useState<DataEnvelope<Weather> | null>(null);
  const [market, setMarket] = useState<DataEnvelope<MarketQuote[]> | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then(setWeather)
      .catch(() => setWeather(null));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams({ symbols: JSON.stringify(watchlist) });
    fetch(`/api/market?${params.toString()}`)
      .then((r) => r.json())
      .then(setMarket)
      .catch(() => setMarket(null));
  }, [watchlist]);

  const rankedInterests = [...interests].sort((a, b) => a.rank - b.rank);
  const storiesInOrder = buildRankedStories(interests, articles);

  const [lead, ...rest] = storiesInOrder;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="mx-auto max-w-brief w-full px-4 sm:px-6 flex-1">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            <DailyBriefHeader userName={currentUser.name} date={new Date()} />
            <MorningDashboard
              weather={weather}
              market={market}
              watchlist={watchlist}
              onWatchlistChange={setWatchlist}
            />
          </div>

          <div className="lg:pt-8">
            <InterestManager
              interests={rankedInterests}
              onChange={setInterests}
              onReset={() => setInterests(currentUser.interests)}
            />
          </div>
        </div>

        {lead ? (
          <>
            <LeadStory article={lead.article} interest={lead.interest} />

            {rest.length > 0 && (
              <section className="mt-10 pt-6 border-t border-rule">
                <h2 className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  More For You
                </h2>
                <div>
                  {rest.map(({ article, interest }) => (
                    <StoryCard
                      key={article.id}
                      article={article}
                      interest={interest}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="mt-10 pt-8 border-t-2 border-ink text-sm text-ink/60">
            No stories to show — add an interest to start building your
            brief.
          </div>
        )}

        <DailyGame />
      </main>

      <Footer />
    </div>
  );
}
