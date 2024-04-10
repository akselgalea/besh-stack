import Elysia from "elysia"
import { db } from "@/db/db"
import { tasks } from "@/db/schema"

export const routes = new Elysia({ prefix: 'tasks' })
  .get('/', () => {
    return db.select().from(tasks)
  })