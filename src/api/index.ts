import swagger from "@elysiajs/swagger"
import Elysia from "elysia"
import { routes as authRoutes } from "./auth"
import { routes as taskRoutes } from "./task"

const api = new Elysia({ prefix: 'api' })
  .use(swagger())
  .use(authRoutes)
  .use(taskRoutes)

export default api