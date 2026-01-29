import { createStore } from "solid-js/store"
import { createSimpleContext } from "./context"
import { createMemo } from "solid-js"

export interface Router {
  name: 'home' | 'session',
  query?: Record<string, string>
}


export const { use: useRouter, provider: RouterProvider } = createSimpleContext({
  name: 'Router',
  init: () => {
    const [route, setRoute] = createStore<Router>({
      name: 'home',
      query: {}
    })

    return {
      get query() {
        return route.query
      },
      get name() {
        return route.name
      },
      navigate(to: Router['name'] | Router) {
        if (typeof to === 'string') {
          setRoute("name", to)
        } else {
          setRoute('name', to.name)
          setRoute('query', to.query)
        }
      }
    }
  }
})