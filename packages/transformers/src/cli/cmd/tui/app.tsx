import { createCliRenderer } from "@opentui/core"
import { createRoot, useTerminalDimensions } from "@opentui/react"
import { Home } from "./routes/home"
import { Session } from "./routes/session"
import { RouterProvider, useRouter } from "./composables/router"
import { ThemeProvider, useTheme } from "./composables/theme"

function App() {
  const dimensions = useTerminalDimensions()
  const { theme } = useTheme()
  const { name } = useRouter()
  return (
    <box
      width={dimensions.width}
      height={dimensions.height}
      backgroundColor={theme.background}
    >
      {
        name === 'home' ? <Home /> : <Session />
      }
    </box>
  )
}

export function tui() {
  return new Promise<void>(async () => {
    const renderer = await createCliRenderer({
      exitOnCtrlC: true
    })

    createRoot(renderer).render(
      <RouterProvider>
        <ThemeProvider mode={'dark'}>
          <App />
        </ThemeProvider>
      </RouterProvider>
    )
  })
}
