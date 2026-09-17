export default function Footer() {
  return (
    <footer className="mt-12 border-t border-rule">
      <div className="mx-auto max-w-brief px-4 sm:px-6 py-8 text-xs text-ink/50 leading-relaxed space-y-2">
        <p>
          Briefly uses AI to summarize reporting from original publishers.
          Always consult the linked source for the full story and context.
        </p>
        <p>
          Market and weather data are provided for general informational
          purposes and may be delayed or approximate. Sample data is
          explicitly labeled wherever shown.
        </p>
        <p className="text-ink/35">
          Briefly is a student prototype. Not a real product. Not investment,
          weather, or political advice.
        </p>
      </div>
    </footer>
  );
}
