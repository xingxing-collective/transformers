import { KeyEvent, MouseEvent, RGBA, type TextareaRenderable } from "@opentui/core";
import { EmptyBorder } from "./border";
//import { useTheme } from "../composables/theme";
import { useRouter } from "../composables/router";
import { useEffect } from "react";

export type PromptProps = {
  visible?: boolean
  disabled?: boolean
  onSubmit?: ({ input }: { input: TextareaRenderable }) => void
}

export function Prompt(props: PromptProps) {
  let input: TextareaRenderable
  const { theme, highlight } = {
    theme: {
      text: RGBA.fromValues(0.93, 0.93, 0.93, 1.00),
      textMuted: RGBA.fromValues(0.50, 0.50, 0.50, 1.00),
      backgroundElement: RGBA.fromValues(0.12, 0.12, 0.12, 1.00),
      border: RGBA.fromValues(0.25, 0.25, 0.25, 1.00),
      backgroundPanel: RGBA.fromValues(0.15, 0.15, 0.15, 1.00),
    },
    highlight: RGBA.fromValues(0.36, 0.61, 0.96, 1.00)
  }
  const { name, navigate } = useRouter()

  useEffect(() => {
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
            backgroundColor={theme.backgroundElement}
            flexGrow={1}
          >
            <textarea
              placeholder={`Ask anything... "`}
              textColor={theme.text}
              ref={(r: TextareaRenderable) => {
                input = r
              }}
              onSubmit={submit}
              onMouseDown={(r: MouseEvent) => r.target?.focus()}
              onKeyDown={(e: KeyEvent) => {
                if (props.disabled) {
                  e.preventDefault()
                  return
                }
              }}
              focusedTextColor={theme.text}
              minHeight={1}
              maxHeight={6}
            />
            <box flexDirection="row" flexShrink={0} paddingTop={1} gap={1}>
              <text fg={highlight}>
                Translation{" "}
              </text>
              <box flexDirection="row" gap={1}>
                <text flexShrink={0} fg={theme.text}>
                  nllb-200-distilled-600M
                </text>
                <text fg={theme.textMuted}>Xenova</text>
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
            vertical: theme.backgroundElement.a !== 0 ? "╹" : " ",
          }}
        >
          <box
            height={1}
            border={["bottom"]}
            borderColor={theme.backgroundElement}
            customBorderChars={
              theme.backgroundElement.a !== 0
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