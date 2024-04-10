import { Elysia } from "elysia"
import { staticPlugin } from "@elysiajs/static"
import apiRoutes from "./api"
import pageRoutes from "./www"

const server = new Elysia()
  .use(staticPlugin())
  .use(apiRoutes)
  .use(pageRoutes)
  .listen(3000)
console.log(
  `🦊 Elysia is running at http://${server.server?.hostname}:${server.server?.port}`
)
