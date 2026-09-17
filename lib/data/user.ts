import { User } from "@/lib/types";

// TODO(production): replace with a user record loaded from an authenticated
// session + user/interest database. For this prototype Billy is a fixed
// fictional subscriber.
export const currentUser: User = {
  id: "billy",
  name: "Billy",
  location: "Lexington, Virginia",
  interests: [
    { id: "permian-ma", name: "Permian M&A", rank: 1 },
    { id: "gold-commodities", name: "Gold & Commodities", rank: 2 },
    { id: "va-congress", name: "Virginia Congressional Elections", rank: 3 },
    { id: "everton", name: "Everton Football Club", rank: 4 },
  ],
  watchlist: [
    { symbol: "AAPL", companyName: "Apple" },
    { symbol: "NVDA", companyName: "NVIDIA" },
    { symbol: "META", companyName: "Meta Platforms" },
    { symbol: "TSLA", companyName: "Tesla" },
    { symbol: "TSM", companyName: "Taiwan Semiconductor Manufacturing" },
  ],
};
