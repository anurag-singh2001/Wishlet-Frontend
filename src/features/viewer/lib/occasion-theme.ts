export interface OccasionTheme {
  bg: string;
  text: string;
  icon: string;
  title: string;
}

export const OCCASION_THEMES: Record<string, OccasionTheme> = {
  birthday: { bg: "#fff1f2", text: "#f43f5e", icon: "🎂", title: "Happy Birthday" },
  anniversary: { bg: "#fdf2f8", text: "#db2777", icon: "💍", title: "Happy Anniversary" },
  "thank-you": { bg: "#ecfdf5", text: "#10b981", icon: "🙏", title: "Thank You" },
  congratulations: { bg: "#f0f9ff", text: "#0ea5e9", icon: "🎉", title: "Congratulations" },
  sorry: { bg: "#f8fafc", text: "#64748b", icon: "🤍", title: "I'm Sorry" },
};

const DEFAULT_THEME: OccasionTheme = {
  bg: "#f8fafc",
  text: "#475569",
  icon: "✨",
  title: "A Special Wish",
};

export function getOccasionTheme(occasion: string): OccasionTheme {
  return OCCASION_THEMES[occasion] ?? DEFAULT_THEME;
}
