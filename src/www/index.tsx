import Elysia, { StatusMap, t } from "elysia"
import { html } from "@elysiajs/html"
import Layout from "./components/Layout/Layout"
import { NotFoundPage, HomePage } from "./pages"
import Test from "./pages/test/Test"
import { User } from "@/types"
import jwt from "@elysiajs/jwt"
import { routes as authRoutes } from "./auth"

const www = new Elysia()
  .use(html())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!
    })
  )
  .use(authRoutes)
  .get('', async ({ path, jwt, cookie: { auth }, set }) => {
    const user = await jwt.verify(auth.value)

    if (!user) {
      set.status = StatusMap["Unauthorized"]
      set.redirect = '/login'

      return 'Unauthorized'
    }

    return (
      <Layout title="home" user={user as User} currentUrl={path}>
        <HomePage></HomePage>
      </Layout>
    )
  })
  .get('test', Test)
  .get('*', async ({ path, cookie: { auth }, jwt }) => {
    const user = await jwt.verify(auth.value)
    
    return (
      <Layout title="Page not found" currentUrl={path} user={ user as User }>
        <NotFoundPage></NotFoundPage>
      </Layout>
    )
  })

export default www