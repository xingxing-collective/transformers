import { Logo } from "../components/logo";

export function Home(){
  return <>
    <box flexGrow={1} justifyContent="center" alignItems="center" paddingLeft={2} paddingRight={2} gap={1}>
        <box height={3} />
        <Logo />
    </box>
  </>
}