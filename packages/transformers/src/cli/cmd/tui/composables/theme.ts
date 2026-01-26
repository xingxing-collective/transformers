import { RGBA } from "@opentui/core";

export function useTheme() {
  return {
    theme: {
      text: RGBA.fromValues(0.93, 0.93, 0.93, 1),
      backgroundElement: RGBA.fromValues(0.12, 0.12, 0.12, 1),
      border: RGBA.fromValues(0.25, 0.25, 0.25, 1),
      backgroundPanel: RGBA.fromValues(0.15, 0.15, 0.15, 1),
    },
    highlight: RGBA.fromValues(0.36, 0.61, 0.96, 1),
  }
}