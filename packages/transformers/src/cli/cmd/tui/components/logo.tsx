import { name } from '../../../../../package.json'
export function Logo() {
  return (
    <box>
      <ascii_font font={'tiny'} color={'gray'} text={name} />
    </box>
  )
}