import { KeyEvent, MouseEvent, TextareaRenderable } from "@opentui/core";
import { EmptyBorder } from "./border";
import { useTheme } from "../composables/theme";
import { useRouter } from "../composables/router";
import clipboardy from "clipboardy"

export function Prompt() {
  let input: TextareaRenderable
  const { theme, highlight } = useTheme()
  const router = useRouter()

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
                if (router.route === 'home' && e.name === 'return') {
                  e.preventDefault();
                  router.navigate({
                    name: 'session',
                    query:{
                      content: input.plainText
                    }
                  })
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
                  Xenova/nllb-200-distilled-600M
                </text>
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