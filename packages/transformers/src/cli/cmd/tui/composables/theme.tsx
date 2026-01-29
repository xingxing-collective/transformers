import { RGBA, type TerminalColors } from "@opentui/core"
import { createSimpleContext } from "./context"
import { createStore } from "solid-js/store"

export type ThemeMode = 'dark' | 'light'
export type Theme = {
  mode: ThemeMode,
  colors: Record<ThemeMode, Record<string, RGBA>>
}

export const { use: useTheme, provider: ThemeProvider } = createSimpleContext({
  name: 'Theme',
  init: (props: { mode: 'dark' | 'light' }) => {

    const [theme, setTheme] = createStore<Theme>({
      mode: props.mode,
      colors: {
        dark: {
          text: RGBA.fromValues(0.93, 0.93, 0.93, 1.00),
          textMuted: RGBA.fromValues(0.50, 0.50, 0.50, 1.00),

          background: RGBA.fromValues(0.04, 0.04, 0.04, 1.00),
          backgroundPanel: RGBA.fromValues(0.15, 0.15, 0.15, 1.00),
          backgroundElement: RGBA.fromValues(0.12, 0.12, 0.12, 1.00),

          border: RGBA.fromValues(0.25, 0.25, 0.25, 1.00),
        },
        light: {
          text: RGBA.fromValues(0.10, 0.10, 0.10, 1.00),
          textMuted: RGBA.fromValues(0.54, 0.54, 0.54, 1.00),

          background: RGBA.fromValues(1.00, 1.00, 1.00, 1.00),
          backgroundPanel: RGBA.fromValues(0.98, 0.98, 0.98, 1.00),
          backgroundElement: RGBA.fromValues(0.96, 0.96, 0.96, 1.00),

          border: RGBA.fromValues(0.72, 0.72, 0.72, 1.00),
        }
      }
    })


    return {
      get mode() {
        return theme.mode
      },
      get colors() {
        return theme.colors[theme.mode]
      },
      highlight: RGBA.fromValues(0.36, 0.61, 0.96, 1.00),
    }
  }
})