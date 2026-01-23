import { createCliRenderer, TextAttributes } from "@opentui/core"
import { createRoot } from "@opentui/react";

function App() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box justifyContent="center" alignItems="flex-end">
        <ascii-font font="tiny" text="Transformers" />
        <text alignSelf="center" attributes={TextAttributes.DIM}>What will you build?</text>
      </box>
    </box>
  );
}

export function tui() {
  return new Promise<void>(async (resolve) => {
    const renderer = await createCliRenderer()
    createRoot(renderer).render(<App />)
  })
}
