import { DataEnvelope, Weather } from "@/lib/types";

// TODO(production): replace hardcoded coordinates with a geocoding step
// driven by the user's saved location preference (see ChangeLocationModal).
const LEXINGTON_VA = { lat: 37.784, lon: -79.4428, label: "Lexington, VA" };

// WMO weather codes -> short condition label + one-line blurb.
// https://open-meteo.com/en/docs (free, keyless API)
function describeWeatherCode(code: number): string {
  if (code === 0) return "Clear";
  if (code === 1) return "Mostly Clear";
  if (code === 2) return "Partly Cloudy";
  if (code === 3) return "Overcast";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 85 && code <= 86) return "Snow Showers";
  if (code >= 95) return "Thunderstorms";
  return "Mild";
}

function buildBlurb(condition: string, high: number, precip: number): string {
  if (precip >= 50) return `Keep an eye on the sky — a good chance of wet weather today.`;
  if (condition.includes("Rain") || condition.includes("Drizzle") || condition.includes("Thunder"))
    return "Bring a layer for changing conditions later today.";
  if (high >= 85) return "A warm one — light layers recommended this afternoon.";
  if (high <= 45) return "Bundle up — a cold start to the day.";
  return "Comfortable conditions for most of the day.";
}

const SAMPLE_WEATHER: Weather = {
  location: LEXINGTON_VA.label,
  temperature: 72,
  high: 79,
  low: 61,
  condition: "Partly Cloudy",
  precipitationProbability: 20,
  blurb: "Comfortable morning with warmer temperatures this afternoon.",
};

/** Server-side fetch of live weather from Open-Meteo (free, no API key).
 * Falls back to labeled sample data on any failure so the UI never breaks
 * and never mislabels sample data as live. */
export async function getWeather(): Promise<DataEnvelope<Weather>> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${LEXINGTON_VA.lat}&longitude=${LEXINGTON_VA.lon}` +
    `&current=temperature_2m,weather_code,precipitation_probability` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`);
    const json = await res.json();

    const condition = describeWeatherCode(json.current.weather_code);
    const high = Math.round(json.daily.temperature_2m_max[0]);
    const low = Math.round(json.daily.temperature_2m_min[0]);
    const precip = Math.round(json.daily.precipitation_probability_max[0] ?? 0);

    const weather: Weather = {
      location: LEXINGTON_VA.label,
      temperature: Math.round(json.current.temperature_2m),
      high,
      low,
      condition,
      precipitationProbability: precip,
      blurb: buildBlurb(condition, high, precip),
    };

    return {
      data: weather,
      isLive: true,
      source: "Open-Meteo",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      data: SAMPLE_WEATHER,
      isLive: false,
      source: "Sample data",
      fetchedAt: new Date().toISOString(),
    };
  }
}
