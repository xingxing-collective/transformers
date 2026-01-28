import { KeyEvent, MouseEvent, type TextareaRenderable } from "@opentui/core";
import { EmptyBorder } from "./border";
import { useRouter } from "../composables/router";
import { useEffect } from "react";
import { useTheme } from "../composables/theme";

export type PromptProps = {
  visible?: boolean
  disabled?: boolean
  onSubmit?: ({ input }: { input: TextareaRenderable }) => void
}

export function Prompt(props: PromptProps) {
  let input: TextareaRenderable
  const { theme, highlight } = useTheme()
  const { name, navigate } = useRouter()

  useEffect(() => {
    if (props.visible !== false) input?.focus()
    if (props.visible === false) input?.blur()
  })

  function submit() {
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
              onMouseDown={(r: MouseEvent) => r.target?.focus()}
              onKeyDown={(e: KeyEvent) => {
                if (props.disabled) {
                  e.preventDefault()
                  return
                }
                if (e.name == 'return') {
                  if (name == 'home') {
                    navigate({
                      name: 'session',
                      query: {
                        content: input.plainText
                      }
                    })
                  }
                  submit()
                  e.preventDefault()
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