// TODO(production): render an actual daily puzzle here (word game, trivia,
// mini-crossword, etc.) generated fresh each day, with completion state and
// streak tracking persisted to a user record. This is a polished
// placeholder that mirrors the eventual layout.
export default function DailyGame() {
  return (
    <section className="mt-10 pt-8 border-t-2 border-ink">
      <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
        The Daily Game
      </div>

      <div className="mt-4 border border-ink/15 bg-white/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
        <div>
          <h3 className="font-serif text-2xl text-ink">
            A new 2-minute challenge every morning.
          </h3>
          <p className="mt-2 text-sm text-ink/65 max-w-md leading-relaxed">
            A quick daily puzzle to warm up your brain alongside your brief.
            Come back tomorrow for a new one.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink/70">
            <span aria-hidden>🔥</span>
            <span className="font-medium">4 day streak</span>
          </div>
        </div>

        <button
          disabled
          className="shrink-0 border border-ink px-6 py-2.5 text-sm font-medium text-ink/40 cursor-not-allowed"
          title="Coming soon"
        >
          Play Today&rsquo;s Game
        </button>
      </div>
    </section>
  );
}
