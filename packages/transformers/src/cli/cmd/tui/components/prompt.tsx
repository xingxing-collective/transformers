import { RGBA, MouseEvent } from "@opentui/core";
import { EmptyBorder } from "./border";

export function Prompt() {

  const theme = {
    backgroundElement: RGBA.fromValues(0.12, 0.12, 0.12, 1),
    text: RGBA.fromValues(0.93, 0.93, 0.93, 1),
  }

  const highlight = () => RGBA.fromValues(0.36, 0.61, 0.96, 1)

  const submit = () => {
  }

  return (
    <>
      <box>
        <box
          border={["left"]}
          borderColor={highlight()}
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
              onMouseDown={(r: MouseEvent) => r.target?.focus()}
              onSubmit={submit}
              focusedTextColor={theme.text}
              minHeight={1}
              maxHeight={6}
            />
            <box flexDirection="row" flexShrink={0} paddingTop={1} gap={1}>
              <text fg={highlight()}>
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
          borderColor={highlight()}
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