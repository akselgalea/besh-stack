import Elysia, { t } from "elysia"
import HomePage from "./pages/home/Home"
import { html } from "@elysiajs/html"
import Layout from "./components/Layout/Layout"
import NotFound from "./pages/not-found/NotFound"
import Test from "./pages/test/Test"
import LoginPage from "./pages/auth/LogIn"
import { ValidateLogin } from "@/api/schema/auth.schema"
import { LoginRequest, User } from "@/types"
import { Login } from "@/utils/auth"
import jwt from "@elysiajs/jwt"

const www = new Elysia()
  .use(html())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!
    })
  )
  .get('', async ({ path, jwt, cookie: { auth }, set }) => {
    const user = await jwt.verify(auth.value)

    if (!user) {
      set.status = 401
      set.redirect = '/login'

      return 'Unauthorized'
    }

    return (
      <Layout title="home" user={user as User} currentUrl={path}>
        <HomePage></HomePage>
      </Layout>
    )
  })
  .get('login', async ({ jwt, cookie: { auth }, set }) => {
    const user = await jwt.verify(auth.value)

    if (user) {
      console.log(user)
      set.status = 401
      set.redirect = '/'

      return 'Unauthorized'
    }

    return LoginPage({})
  })
  .post('login', async ({ body, set, jwt, cookie: { auth } }) => {
    const validated = ValidateLogin(body)
    
    if (!validated.success) {
      return LoginPage({ old: body, errors: validated.error.flatten() })
    }

    const user = await Login(validated.data)

    if (!user) {
      return LoginPage({ old: body, errorMessage: "Your login credentials don't match our records" })
    }
 
    auth.set({
      value: await jwt.sign({ email: user.email, name: user.name, lastname: user.lastname }),
      httpOnly: true,
      maxAge: 7 * 86400, // one week
      path: '/'
    })

    set.redirect = '/'
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String()
    })
  })
  .get('logout', ({ cookie: { auth }, set }) => {
    auth.remove()
    set.redirect = '/login'
  })
  .get('test', Test)
  .get('*', (ctx) => {
    return (
      <Layout title="Page not found" currentUrl={ctx.path}>
        <NotFound></NotFound>
      </Layout>
    )
  })

export default www