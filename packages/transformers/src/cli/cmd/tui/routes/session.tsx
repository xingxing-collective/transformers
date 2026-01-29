import { createStore } from "solid-js/store"
import { SplitBorder } from "../components/border";
import { useTheme } from "../composables/theme";
import { useRouter } from "../composables/router";
import { Prompt } from "../components/prompt";
import type { TextareaRenderable } from "@opentui/core";
import { Translation } from "@/translation"

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Session() {
  const { query } = useRouter()
  const { colors } = useTheme()
  const [messages, setMessages] = createStore<Message[]>([])
  const translation = new Translation()

  function submit(prompt: { input: TextareaRenderable }) {
    setMessages(pre => [...pre, {
      role: 'user',
      content: prompt.input.plainText
    }])
    translation.translator(prompt.input.plainText, {
      src_lang: 'eng_Latn',
      tgt_lang: 'zho_Hans'
    }).then(x => {
      setMessages(pre => [...pre, {
        role: 'user',
        content: x.flat(1)[0].translation_text
      }])
    })

  }
  return (
    <>
      <box flexDirection="row">
        <box flexGrow={1} paddingBottom={1} paddingTop={1} paddingLeft={2} paddingRight={2} gap={1}>
          <scrollbox
            stickyScroll={true}
            stickyStart="bottom"
            flexGrow={1}
            verticalScrollbarOptions={{
              paddingLeft: 1,
              visible: false,
              trackOptions: {
                backgroundColor: colors.backgroundElement,
                foregroundColor: colors.border,
              },
            }}
          >
            {
              messages.map((message, index) => {
                if (message.role === 'user') {
                  return <UserMessage index={index} message={message} />
                }
                if (message.role === 'assistant') {
                  return <AssistantMessage index={index} message={message} />
                }
              })
            }
          </scrollbox>

          <box flexShrink={0}>
            <Prompt
              onSubmit={submit}
            />
          </box>
        </box>
      </box>
    </>
  )
}


function UserMessage(props: {
  message: Message,
  index: number
}) {
  const { colors, highlight } = useTheme()
  return (
    <>
      <box
        border={["left"]}
        borderColor={highlight}
        customBorderChars={SplitBorder.customBorderChars}
        marginTop={1}
      >
        <box
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          backgroundColor={colors.backgroundElement}
          flexShrink={0}
        >
          <text fg={colors.text}>{props.message.content}</text>
        </box>
      </box>
    </>
  )
}

function AssistantMessage(props: {
  message: Message,
  index: number
}) {
  const { colors, highlight } = useTheme()

  return (
    <>
      <box
        border={["left"]}
        borderColor={highlight}
        customBorderChars={SplitBorder.customBorderChars}
        marginTop={1}
      >
        <box
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          backgroundColor={colors.backgroundElement}
          flexShrink={0}
        >
          <text fg={colors.text}>{props.message.content}</text>
        </box>
      </box>
    </>
  )
}