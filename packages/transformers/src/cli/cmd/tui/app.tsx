import { createCliRenderer } from "@opentui/core"
import { createRoot, useTerminalDimensions } from "@opentui/react"
import { Home } from "./routes/home"
import { Session } from "./routes/session"
import { RouterProvider, useRouter } from "./composables/router"

function App() {
  const dimensions = useTerminalDimensions()
  return (
    <box
      width={dimensions.width}
      height={dimensions.height}
    >
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </box>
  )
}

function AppContent() {
  const { route } = useRouter()
  return route === 'home' ? <Home /> : <Session />
}

export function tui() {
  return new Promise<void>(async (resolve) => {
    const renderer = await createCliRenderer()
    createRoot(renderer).render(<App />)
  })
}
