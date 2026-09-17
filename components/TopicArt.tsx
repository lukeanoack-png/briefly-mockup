// Editorial placeholder used wherever a story has no reliably-sourced
// image. Never renders a broken <img> — always a designed placeholder.
// TODO(production): replace with a real image pipeline (publisher OG image
// when licensing allows, otherwise a generated/stock illustration set).

const PALETTE: Record<string, { bg: string; fg: string }> = {
  "permian-ma": { bg: "#2b2420", fg: "#e8c9a1" },
  "gold-commodities": { bg: "#3a2f1a", fg: "#e3c168" },
  "va-congress": { bg: "#1f2a33", fg: "#b9d3e0" },
  everton: { bg: "#0f2a4a", fg: "#cfe0f0" },
};

function initials(topic: string): string {
  return topic
    .split(/\s+/)
    .filter((w) => w[0] && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("") || topic.slice(0, 2).toUpperCase();
}

export default function TopicArt({
  topic,
  interestId,
  size = "large",
}: {
  topic: string;
  interestId: string;
  size?: "large" | "small";
}) {
  const palette = PALETTE[interestId] ?? { bg: "#33302a", fg: "#e6ddc9" };
  const height = size === "large" ? "h-56 sm:h-72" : "h-28";

  return (
    <div
      className={`relative w-full ${height} overflow-hidden`}
      style={{ backgroundColor: palette.bg }}
      role="img"
      aria-label={`Illustrative placeholder for ${topic}`}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${palette.fg} 0px, ${palette.fg} 1px, transparent 1px, transparent 14px)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-serif tracking-tight ${
            size === "large" ? "text-6xl sm:text-7xl" : "text-3xl"
          }`}
          style={{ color: palette.fg, opacity: 0.85 }}
        >
          {initials(topic)}
        </span>
      </div>
      {size === "large" && (
        <div
          className="absolute left-0 right-0 bottom-0 px-4 py-2 text-[11px] uppercase tracking-[0.14em] truncate"
          style={{ color: palette.fg, opacity: 0.75 }}
        >
          {topic} · Illustrative placeholder
        </div>
      )}
    </div>
  );
}
