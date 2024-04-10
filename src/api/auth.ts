import Elysia, { t } from "elysia"
import { db } from "@/db/db"
import { users } from "@/db/schema"

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
  .post('register', ({ body }) => {
    return body
  }, {
    body: t.Object({
      name: t.String(),
      lastname: t.String(),
      email: t.String({ format: 'email', error: 'Invalid email' }),
      password: t.String({ minLength: 6, error: 'The field password must contain at least 6 characters' }),
      confirmation: t.String({ minLength: 6, error: 'The field password must contain at least 6 characters' })
    })
  })