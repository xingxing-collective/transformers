import { createCliRenderer } from "@opentui/core"
import { createRoot, useTerminalDimensions } from "@opentui/react";
import { Home } from "./routes/home";

function App() {
  const dimensions = useTerminalDimensions()

  return (
    <box
      width={dimensions.width}
      height={dimensions.height}
    >
      <Home />
    </box>
  )
}

export function tui() {
  return new Promise<void>(async (resolve) => {
    const renderer = await createCliRenderer()
    createRoot(renderer).render(<App />)
  })
}
