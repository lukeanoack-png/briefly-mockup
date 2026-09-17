"use client";

import Modal from "@/components/Modal";

// TODO(production): wire this up to interest creation + AI relevance
// scoring so a newly added topic starts surfacing matching articles.
export default function AddInterestModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Add an interest" onClose={onClose}>
      <p className="text-sm text-ink/70 leading-relaxed">
        In the full product, you&rsquo;ll be able to add any topic — a
        company, a race, a team, a market — and Briefly will start finding
        and ranking relevant stories for it automatically.
      </p>
      <div className="mt-4">
        <label className="block text-xs uppercase tracking-wide text-ink/50 mb-1">
          Topic
        </label>
        <input
          disabled
          placeholder="e.g. Federal Reserve policy"
          className="w-full border border-rule bg-ink/5 px-3 py-2 text-sm text-ink/40 cursor-not-allowed"
        />
      </div>
      <button
        disabled
        className="mt-4 w-full bg-ink/20 text-paper text-sm py-2 cursor-not-allowed"
      >
        Add interest (coming soon)
      </button>
    </Modal>
  );
}
