import { NextResponse } from "next/server";
import { getWeather } from "@/lib/services/weather";

// TODO(production): accept a location param sourced from user preferences
// instead of the hardcoded Lexington, VA coordinates in lib/services/weather.ts.
export async function GET() {
  const envelope = await getWeather();
  return NextResponse.json(envelope);
}
