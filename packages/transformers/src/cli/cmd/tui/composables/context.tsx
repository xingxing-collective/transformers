import React, { createContext, useContext } from "react"
import clipboardy from 'clipboardy'

export type ParentProps<P extends Record<string, any> = {}> = P & {
  children?: React.ReactNode;
};

export function createSimpleContext<T, Props extends Record<string, any>>(input: {
  name: string
  init: ((input: Props) => T) | (() => T)
}) {
  const ctx = createContext<T>({} as T)

  return {
    provider: (props: ParentProps<Props>) => {
      const init = input.init(props)
      clipboardy.writeSync(JSON.stringify({ props, init }))
      //@ts-ignore
      return (init.ready === undefined || init.ready === true) ? <ctx.Provider value={init}>{props.children}</ctx.Provider> : <></>
    },
    use() {
      const value = useContext(ctx)
      if (!value) throw new Error(`${input.name} context must be used within a context provider`)
      return value
    },
  }
}