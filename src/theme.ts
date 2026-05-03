export const FONT_FAMILY_REGULAR = "PressStart2P_400Regular";

export const COLORS = {
  // Base colors
  background: "#121414", // Deep navy surface
  surface: "#1e2020", // Surface container
  surfaceHighlight: "rgba(0, 228, 120, 0.15)", // Surface container highest

  // Player X colors (Electric Green)
  playerX: "#00e478", // Electric green accent
  playerXLight: "#60ff98", // Lighter green accent
  playerXTransparent: "rgba(0, 228, 120, 0.15)",

  // Text colors
  text: "#e2e2e2", // On-surface white
  textSecondary: "#b9cbb9", // On-surface variant
  textTertiary: "#849585", // Outline color

  // Player X accent colors
  playerXAccent: "#00e478", // Electric green for emphasis
  playerXAccentTransparent: "rgba(0, 228, 120, 0.18)",

  // Functional colors
  border: "rgba(132, 149, 133, 0.25)", // Subtle borders from outline
  playerO: "#F56857", // Player O color (red)
  playerOLight: "#ffdad6", // Lighter player O red
  playerOTransparent: "rgba(255, 180, 171, 0.2)",
  playerXSuccess: "#00ff87", // Player X success (primary container)

  // Game specific highlights (Player X)
  playerXHighlight: "rgba(0, 228, 120, 0.25)", // Subtle green highlight
  playerXHighlightStrong: "rgba(0, 228, 120, 0.35)", // Stronger green highlight
  playerXHighlightTransparent: "rgba(0, 228, 120, 0.0)",

  // Game specific highlights (Player O)
  playerOHighlight: "rgba(255, 180, 171, 0.25)", // Subtle red highlight
  playerOHighlightStrong: "rgba(255, 180, 171, 0.35)", // Stronger red highlight
  playerOHighlightTransparent: "rgba(255, 180, 171, 0.0)",
} as const;

// Enhanced elevation with tonal layering
export const ELEVATION = {
  small: {
    backgroundColor: "#161D2F",
    borderWidth: 1,
    borderColor: "rgba(132, 149, 133, 0.1)",
    boxShadow: "0px 2px 4px rgba(11, 17, 32, 0.18)",
  },
  medium: {
    backgroundColor: "#161D2F",
    borderWidth: 1,
    borderColor: "rgba(132, 149, 133, 0.1)",
    boxShadow: "0px 10px 30px rgba(11, 17, 32, 0.23)",
  },
} as const;

