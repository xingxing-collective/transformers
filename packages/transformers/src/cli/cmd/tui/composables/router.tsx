import { createContext, useContext, useState, type ReactNode } from "react"

export interface Router {
  name: 'home' | 'session',
  query?: Record<string, string>
}

const RouterContext = createContext<{
  route: Router['name'],
  query?: Router['query'],
  navigate: (to: Router['name'] | Router) => void
}>({
  route: 'home',
  query: {},
  navigate: () => { }
})

export function RouterProvider({ children }: { children: ReactNode }) {
  const [router, setRoute] = useState<Router>({
    name: 'home',
    query: {}
  })

  return (
    <RouterContext.Provider value={{
      route: router.name,
      query: router.query,
      navigate: (router) => setRoute(typeof router === 'string' ? { name: router } : router)
    }}>
      {children}
    </RouterContext.Provider>
  )
}

export const useRouter = () => {
  const context = useContext(RouterContext)
  if (!context) throw new Error(`router cntext must be used within a context provider`)
  return context
}