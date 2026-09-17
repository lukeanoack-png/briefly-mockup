"use client";

import { Interest } from "@/lib/types";

export default function RankedInterest({
  interest,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}: {
  interest: Interest;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
}) {
  return (
    <li
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex items-center gap-2 py-2 px-2 -mx-2 border-b border-rule last:border-b-0 bg-white/60 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      <span className="text-ink/25 text-sm select-none" aria-hidden>
        ⠿
      </span>
      <span className="text-[11px] font-semibold text-accent w-5 shrink-0">
        {index + 1}
      </span>
      <span className="flex-1 text-sm text-ink leading-tight">
        {interest.name}
      </span>
      <div className="flex items-center gap-0.5">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          aria-label={`Move ${interest.name} up`}
          className="text-ink/40 hover:text-ink disabled:opacity-20 disabled:hover:text-ink/40 px-1 text-xs"
        >
          ▲
        </button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          aria-label={`Move ${interest.name} down`}
          className="text-ink/40 hover:text-ink disabled:opacity-20 disabled:hover:text-ink/40 px-1 text-xs"
        >
          ▼
        </button>
        <button
          onClick={onRemove}
          aria-label={`Remove ${interest.name}`}
          className="text-ink/30 hover:text-loss px-1 text-sm"
        >
          ×
        </button>
      </div>
    </li>
  );
}
