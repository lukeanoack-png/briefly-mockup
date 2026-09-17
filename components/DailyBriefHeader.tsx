export default function DailyBriefHeader({
  userName,
  date,
}: {
  userName: string;
  date: Date;
}) {
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-8 sm:pt-10">
      <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
        Your Daily Brief
      </div>
      <div className="mt-1 text-sm text-ink/60">{formatted}</div>
      <p className="mt-4 font-serif text-2xl sm:text-3xl text-ink leading-snug text-balance">
        Good morning, {userName}. Here&rsquo;s what matters to you today.
      </p>
    </div>
  );
}
