import { RGBA } from "@opentui/core";

export function useTheme() {
  return {
    theme: {
      text: RGBA.fromValues(0.93, 0.93, 0.93, 1.00),
      textMuted: RGBA.fromValues(0.50, 0.50, 0.50, 1.00),
      backgroundElement: RGBA.fromValues(0.12, 0.12, 0.12, 1.00),
      border: RGBA.fromValues(0.25, 0.25, 0.25, 1.00),
      backgroundPanel: RGBA.fromValues(0.15, 0.15, 0.15, 1.00),
    },
    highlight: RGBA.fromValues(0.36, 0.61, 0.96, 1.00),
  }
}