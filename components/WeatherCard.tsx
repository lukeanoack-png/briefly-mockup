"use client";

import { useState } from "react";
import { DataEnvelope, Weather } from "@/lib/types";
import ChangeLocationModal from "@/components/ChangeLocationModal";

const CONDITION_ICON: Record<string, string> = {
  Clear: "☀️",
  "Mostly Clear": "🌤️",
  "Partly Cloudy": "⛅",
  Overcast: "☁️",
  Foggy: "🌫️",
  Drizzle: "🌦️",
  Rain: "🌧️",
  Snow: "❄️",
  "Rain Showers": "🌧️",
  "Snow Showers": "🌨️",
  Thunderstorms: "⛈️",
  Mild: "🌤️",
};

export default function WeatherCard({
  envelope,
}: {
  envelope: DataEnvelope<Weather> | null;
}) {
  const [showModal, setShowModal] = useState(false);

  if (!envelope) {
    return (
      <div className="border border-rule bg-white/40 p-4 h-full animate-pulse">
        <div className="h-3 w-24 bg-ink/10 mb-3" />
        <div className="h-8 w-16 bg-ink/10 mb-2" />
        <div className="h-3 w-32 bg-ink/10" />
      </div>
    );
  }

  const w = envelope.data;
  const icon = CONDITION_ICON[w.condition] ?? "🌤️";

  return (
    <div className="border border-rule bg-white/40 p-4 sm:p-5 h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="text-xs uppercase tracking-[0.14em] text-ink/50 font-semibold">
          {w.location}
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-[11px] text-accent hover:underline"
        >
          Change location
        </button>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <span className="text-4xl leading-none" aria-hidden>
          {icon}
        </span>
        <div>
          <div className="font-serif text-3xl text-ink leading-none">
            {w.temperature}°F
          </div>
          <div className="text-sm text-ink/70 mt-0.5">{w.condition}</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-ink/70">
        High {w.high}° · Low {w.low}°
        <span className="mx-1.5 text-ink/30">|</span>
        {w.precipitationProbability}% chance of rain
      </div>

      <p className="mt-2 text-sm text-ink/60 italic leading-snug">&ldquo;{w.blurb}&rdquo;</p>

      <div className="mt-auto pt-3 text-[11px] text-ink/40">
        Source: {envelope.source} {envelope.isLive ? "· Live" : "· Sample data"}
      </div>

      {showModal && (
        <ChangeLocationModal
          currentLocation={w.location}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
