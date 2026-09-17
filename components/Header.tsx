export default function Header() {
  return (
    <header className="border-b-2 border-ink">
      <div className="mx-auto max-w-brief px-4 sm:px-6 py-5 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-ink">
            Briefly
          </h1>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-ink/50">
            Prototype Edition
          </span>
        </div>
        <div className="text-right text-xs text-ink/60 leading-tight">
          <div className="uppercase tracking-[0.14em]">Signed in as</div>
          <div className="font-medium text-ink">Billy</div>
        </div>
      </div>
    </header>
  );
}
