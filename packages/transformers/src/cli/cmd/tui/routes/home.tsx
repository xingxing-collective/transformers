import { Logo } from "../components/logo";
import { Prompt } from "../components/prompt";

export function Home() {
  return <>
    <box flexGrow={1} justifyContent="center" alignItems="center" paddingLeft={2} paddingRight={2} gap={1}>
      <box height={3} />
      <Logo />
      <box width="100%" maxWidth={75} zIndex={1000} paddingTop={1}>
        <Prompt />
      </box>
    </box>
  </>
}