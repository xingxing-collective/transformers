import { useState } from "react"
import { createSimpleContext } from "./context"

export interface Router {
  name: 'home' | 'session',
  query?: Record<string, string>
}


export const { use: useRouter, provider: RouterProvider } = createSimpleContext({
  name: 'Router',
  init: () => {
    const [router, setRoute] = useState<Router>({
      name: 'home',
      query: {}
    })

    return {
      get query() {
        return router.query
      },
      get name() {
        return router.name
      },
      get route() {
        return router
      },
      navigate(to: Router['name'] | Router) {
        setRoute(typeof to === 'string' ? { name: to } : to)
      }
    }
  }
})