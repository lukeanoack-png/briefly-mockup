"use client";

import { useState } from "react";
import { Interest } from "@/lib/types";
import RankedInterest from "@/components/RankedInterest";
import AddInterestModal from "@/components/AddInterestModal";

export default function InterestManager({
  interests,
  onChange,
  onReset,
}: {
  interests: Interest[];
  onChange: (next: Interest[]) => void;
  onReset: () => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= interests.length || from === to) return;
    const next = [...interests];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next.map((interest, i) => ({ ...interest, rank: i + 1 })));
  };

  const remove = (id: string) => {
    const next = interests
      .filter((i) => i.id !== id)
      .map((interest, i) => ({ ...interest, rank: i + 1 }));
    onChange(next);
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 border border-rule bg-white/50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.14em] font-semibold text-ink/70">
          Your Interests
        </h2>
        <button
          onClick={onReset}
          className="text-[11px] text-ink/40 hover:text-ink hover:underline"
        >
          Reset
        </button>
      </div>
      <p className="mt-1 text-[11px] text-ink/45 leading-snug">
        Drag to reorder, or use the arrows. Your ranking controls the
        newsletter below.
      </p>

      <ul className="mt-3">
        {interests.map((interest, index) => (
          <RankedInterest
            key={interest.id}
            interest={interest}
            index={index}
            total={interests.length}
            isDragging={dragIndex === index}
            onMoveUp={() => reorder(index, index - 1)}
            onMoveDown={() => reorder(index, index + 1)}
            onRemove={() => remove(interest.id)}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) reorder(dragIndex, index);
              setDragIndex(null);
            }}
          />
        ))}
        {interests.length === 0 && (
          <li className="py-3 text-sm text-ink/50">
            No ranked interests yet.
          </li>
        )}
      </ul>

      <button
        onClick={() => setShowAddModal(true)}
        className="mt-3 w-full border border-dashed border-ink/25 text-sm text-ink/60 py-1.5 hover:bg-ink/5 hover:text-ink"
      >
        + Add interest
      </button>

      {showAddModal && (
        <AddInterestModal onClose={() => setShowAddModal(false)} />
      )}
    </aside>
  );
}
