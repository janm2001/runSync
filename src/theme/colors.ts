// Brand palette — import from here instead of hard-coding hex values

export const brand = {
  /** Deep navy — darkest stop of the login / navbar gradient */
  navy900: "#1a1a2e",
  /** Mid navy — middle stop of the login / navbar gradient */
  navy700: "#16213e",
  /** Royal blue — lightest stop of the login / navbar gradient */
  navy500: "#0f3460",

  /** Primary accent used for buttons, icon badges, etc. */
  accent: "blue.500",
  /** Lighter accent used for feature icons on the dark panel */
  accentLight: "blue.300",
} as const;

/** Gradient shared by the login left-panel and the navbar */
export const defaultPanelGradient =
  `linear-gradient(135deg, ${brand.navy900} 0%, ${brand.navy700} 50%, ${brand.navy500} 100%)`;

// ─── Main application palette ─────────────────────────────────────────────────
// The app uses a unified dark-navy theme in both light and dark colour modes
// so that the content area always feels cohesive with the navbar.

export const palette = {
  // ── Page / body background ──────────────────────────────────────────────────
  /** Light mode page bg — deep navy, slightly warmer than dark mode */
  pageBgLight: "#13192b",
  /** Dark mode page bg — near-black navy */
  pageBgDark: "#0d1117",

  // ── Card / panel surface ────────────────────────────────────────────────────
  /** Light mode card bg — one layer lighter than the page bg */
  cardBgLight: "#1a2540",
  /** Dark mode card bg */
  cardBgDark: "#161f30",

  // ── Subtle secondary surface (table rows, inputs, tag bg) ───────────────────
  /** Light mode subtle bg */
  subtleBgLight: "#1f2d4e",
  /** Dark mode subtle bg */
  subtleBgDark: "#1a2540",

  // ── Foreground / text ───────────────────────────────────────────────────────
  /** Primary text — near-white, high contrast on all dark surfaces */
  textPrimary: "#e2e8f0",
  /** Muted / secondary text — softer but still readable */
  textMuted: "#8896a7",
  /** Subtle text — placeholders, timestamps, fine print */
  textSubtle: "#4d6080",
} as const;

// ─── StatsCard accent colors ───────────────────────────────────────────────────
// Each stat card variant gets a gradient pair and a matching glow color.
// Import `statsCardAccents` in StatsCard instead of hard-coding hex values there.

export const statsCardAccents = {
  users: { from: "#3b82f6", to: "#6366f1", glow: "rgba(99,102,241,0.35)" },
  "chart-pie": { from: "#10b981", to: "#06b6d4", glow: "rgba(16,185,129,0.35)" },
  calendar: { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.35)" },
  "chart-line": { from: "#8b5cf6", to: "#ec4899", glow: "rgba(139,92,246,0.35)" },
} as const;
