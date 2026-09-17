"use client";

import Modal from "@/components/Modal";

// TODO(production): back this with a geocoding lookup + saved location
// preference that the weather service reads instead of the hardcoded
// Lexington, VA coordinates.
export default function ChangeLocationModal({
  currentLocation,
  onClose,
}: {
  currentLocation: string;
  onClose: () => void;
}) {
  return (
    <Modal title="Change location" onClose={onClose}>
      <p className="text-sm text-ink/70 leading-relaxed">
        Weather location will become part of your saved preferences, synced
        with your account.
      </p>
      <div className="mt-4">
        <label className="block text-xs uppercase tracking-wide text-ink/50 mb-1">
          Current location
        </label>
        <input
          disabled
          value={currentLocation}
          className="w-full border border-rule bg-ink/5 px-3 py-2 text-sm text-ink/50 cursor-not-allowed"
        />
      </div>
      <button
        disabled
        className="mt-4 w-full bg-ink/20 text-paper text-sm py-2 cursor-not-allowed"
      >
        Save location (coming soon)
      </button>
    </Modal>
  );
}
