
export const brand = {
  /** Deep navy — darkest stop of the login gradient */
  navy900: "#1a1a2e",
  /** Mid navy — middle stop of the login gradient */
  navy700: "#16213e",
  /** Royal blue — lightest stop of the login gradient */
  navy500: "#0f3460",

  /** Primary accent used for buttons, icon badges, etc. */
  accent: "blue.500",
  /** Lighter accent used for feature icons on the dark panel */
  accentLight: "blue.300",
} as const;

/** Login page left-panel gradient, built from the brand palette */
export const loginPanelGradient =
  `linear-gradient(135deg, ${brand.navy900} 0%, ${brand.navy700} 50%, ${brand.navy500} 100%)`;
