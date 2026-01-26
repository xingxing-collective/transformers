import { createContext, useContext, useState, type ReactNode } from "react"

export interface Router {
  name: 'home' | 'session'
}

const RouterContext = createContext<{
  route: Router['name'],
  navigate: (to: Router['name']) => void
}>({
  route: 'home',
  navigate: () => { }
})

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Router['name']>('home')

  return (
    <RouterContext.Provider value={{ route, navigate: (to) => setRoute(to) }}>
      {children}
    </RouterContext.Provider >
  )
}

export const useRouter = () => {
  const context = useContext(RouterContext)
  if (!context) throw new Error(` RouterCntext must be used within a context provider`)
  return context
}