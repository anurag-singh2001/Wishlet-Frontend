const SPARKLE =
  "M16 5 C16.5 11 21 15.5 27 16 C21 16.5 16.5 21 16 27 C15.5 21 11 16.5 5 16 C11 15.5 15.5 11 16 5Z";
const BURST =
  "M25 1.5v2.6M25 8.9v2.6M20 6.5h2.6M27.4 6.5H30M21.5 3l1.8 1.8M26.7 8.2l1.8 1.8M28.5 3l-1.8 1.8M23.3 8.2L21.5 10";

/** The ✨ mark with a small pink firework burst. `onDark` drops the tile for the brand colour. */
export function NewYearMark({
  size,
  onDark = false,
}: {
  size: number;
  onDark?: boolean;
}): React.JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      {!onDark && <rect width="32" height="32" rx="7" fill="var(--color-brand)" />}
      <path d={SPARKLE} fill="#fff" />
      <path d={BURST} stroke="#FF4F8B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="6.5" r="1.1" fill="#FFD54F" />
    </svg>
  );
}
