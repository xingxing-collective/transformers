import { useState } from "react";
import { SplitBorder } from "../components/border";
import { useTheme } from "../composables/theme";

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Session() {
  
  const [messages, setMessages] = useState<Message[]>([{
    content: "Hello, how can I help you?",
    role: "assistant"
  }, {
    content: "Can you translate 'Hello World' to French?",
    role: "user"
  }])

  const { theme } = useTheme()
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
                backgroundColor: theme.backgroundElement,
                foregroundColor: theme.border,
              },
            }}
          >
            {
              messages.map((message, index) => {
                if (message.role === 'user') {
                  return <UserMessage index={index} message={message} />
                }
                if (message.role === 'assistant') {

                }
              })
            }
          </scrollbox>
        </box>
      </box>
    </>
  )
}

function UserMessage(props: {
  message: Message,
  index: number
}) {
  const { theme } = useTheme()
  return (
    <>
      <box
        border={["left"]}
        borderColor={"red"}
        customBorderChars={SplitBorder.customBorderChars}
        marginTop={props.index === 0 ? 0 : 1}
      >
        <box
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          backgroundColor={theme.backgroundElement}
          flexShrink={0}
        >
          <text fg={theme.text}>{props.message.content}</text>
        </box>
      </box>
    </>
  )
}