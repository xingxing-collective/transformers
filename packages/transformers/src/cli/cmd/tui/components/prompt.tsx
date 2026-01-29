import { KeyEvent, MouseEvent, type TextareaRenderable } from "@opentui/core";
import { EmptyBorder } from "./border";
import { useRouter } from "../composables/router";
import { createEffect } from "solid-js";
import { useTheme } from "../composables/theme";

export type PromptProps = {
  visible?: boolean
  disabled?: boolean
  onSubmit?: ({ input }: { input: TextareaRenderable }) => void
}

export function Prompt(props: PromptProps) {
  let input: TextareaRenderable
  const { colors, highlight } = useTheme()
  const { name, navigate } = useRouter()

  createEffect(() => {
    if (props.visible !== false) input?.focus()
    if (props.visible === false) input?.blur()
  })

  function submit() {
    if (name == 'home') {
      navigate({
        name: 'session',
        query: {
          content: input.plainText
        }
      })
    }
    props.onSubmit?.({ input })
  }

  return (
    <>
      <box>
        <box
          border={["left"]}
          borderColor={highlight}
          customBorderChars={{
            ...EmptyBorder,
            vertical: "┃",
            bottomLeft: "╹",
          }}
        >
          <box
            paddingLeft={2}
            paddingRight={2}
            paddingTop={1}
            flexShrink={0}
            backgroundColor={colors.backgroundElement}
            flexGrow={1}
          >
            <textarea
              placeholder={`Ask anything... "`}
              textColor={colors.text}
              ref={(r: TextareaRenderable) => {
                input = r
              }}
              onSubmit={submit}
              keyBindings={
                [
                  { name: "return", action: "submit" }
                ]
              }
              onMouseDown={(r: MouseEvent) => r.target?.focus()}
              onKeyDown={(e: KeyEvent) => {
                if (props.disabled) {
                  e.preventDefault()
                  return
                }
              }}
              focusedTextColor={colors.text}
              minHeight={1}
              maxHeight={6}
            />
            <box flexDirection="row" flexShrink={0} paddingTop={1} gap={1}>
              <text fg={highlight}>
                Translation{" "}
              </text>
              <box flexDirection="row" gap={1}>
                <text flexShrink={0} fg={colors.text}>
                  nllb-200-distilled-600M
                </text>
                <text fg={colors.textMuted}>Xenova</text>
              </box>
            </box>
          </box>
        </box>
        <box
          height={1}
          border={["left"]}
          borderColor={highlight}
          customBorderChars={{
            ...EmptyBorder,
            vertical: colors.backgroundElement.a !== 0 ? "╹" : " ",
          }}
        >
          <box
            height={1}
            border={["bottom"]}
            borderColor={colors.backgroundElement}
            customBorderChars={
              colors.backgroundElement.a !== 0
                ? {
                  ...EmptyBorder,
                  horizontal: "▀",
                }
                : {
                  ...EmptyBorder,
                  horizontal: " ",
                }
            }
          />
        </box>
      </box>
    </>
  )
}