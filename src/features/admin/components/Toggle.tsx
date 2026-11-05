import React from "react";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps): React.ReactElement {
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[var(--color-brand)]"
      />
      {label}
    </label>
  );
}
