import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { palette } from "./colors";

const config = defineConfig({
  globalCss: {
    body: {
      // Blue as the default interactive colour (buttons, checkboxes, rings…)
      colorPalette: "blue",
      // Ensure body picks up our semantic bg and fg tokens
      bg: "bg",
      color: "fg",
    },
  },

  theme: {
    semanticTokens: {
      colors: {
        // ── Backgrounds ───────────────────────────────────────────────────────
        bg: {
          DEFAULT: {
            value: { _light: palette.pageBgLight, _dark: palette.pageBgDark },
          },
          subtle: {
            value: {
              _light: palette.subtleBgLight,
              _dark: palette.subtleBgDark,
            },
          },
          panel: {
            value: {
              _light: palette.cardBgLight,
              _dark: palette.cardBgDark,
            },
          },
        },

        // ── Foreground / text ─────────────────────────────────────────────────
        // Override so that light text is used even in "light" colour mode,
        // because our dark-navy bg is present in both modes.
        fg: {
          DEFAULT: {
            value: {
              _light: palette.textPrimary,
              _dark: palette.textPrimary,
            },
          },
          muted: {
            value: {
              _light: palette.textMuted,
              _dark: palette.textMuted,
            },
          },
          subtle: {
            value: {
              _light: palette.textSubtle,
              _dark: palette.textSubtle,
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
