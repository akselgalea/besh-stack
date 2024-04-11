import Elysia, { StatusMap, t } from "elysia"
import { db } from "@/db/db"
import { Register } from "@/utils/auth"

export const routes = new Elysia({ prefix: 'auth' })
  .post('login', ({ body }) => {
    const users = db.query.users.findMany()
    console.log(users)
    return 'xd'
  }, {
    body: t.Object({
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 6 })
    })
  })
  .post('register', async ({ body, set }) => {
    if (body.password !== body.confirmation) {
      set.status = StatusMap["Unprocessable Content"]
      return "The passwords don't match"
    }

    const users = await Register(body).catch((error) => {
      if (error.message.includes('users.email')) {
        set.status = StatusMap["Bad Request"]
        return { error: 'Email already in use' }
      }

      return error
    })

    return users
  }, {
    body: t.Object({
      name: t.String({ minLength: 2 }),
      lastname: t.String({ minLength: 2 }),
      email: t.String({ format: 'email' }),
      password: t.String({ minLength: 6 }),
      confirmation: t.String({ minLength: 6 })
    })
  })